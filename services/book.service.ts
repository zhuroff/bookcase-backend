import { Request } from 'express'
import { Types } from 'mongoose'
import { BookModel } from '../types/Book'
import { TListSection, TListSectionContent } from '../types/List'
import { Book } from '../models/book.model'
import { Author } from '../models/author.model'
import { Genre } from '../models/genre.model'
import { Publisher } from '../models/publisher.model'
import { Series } from '../models/series.model'
import { List } from '../models/list.model'
import { ISort, IFilter } from 'types/Common'
import { BookItemDTO, BookPageDTO } from '../dto/book.dto'
import { PaginationDTO } from '../dto/pagination.dto'
import commonService from './common.service'

class BookService {
  async list(req: Request, filter: IFilter = {}, sort?: ISort) {
    const booksListPopulates = [
      { path: 'genres', select: ['title', '_id'] },
      { path: 'lists', select: ['title', '_id', 'lists'] },
      { path: 'authors.author', select: ['title', '_id', 'firstName', 'lastName', 'patronymicName'] }
    ]

    const options: IFilter = {
      page: req.body.page || 1,
      sort: sort || req.body.sort,
      limit: req.body.limit || 100,
      populate: booksListPopulates,
      lean: true,
      select: {
        title: true,
        isDraft: true,
        subtitle: true,
        coverImage: true,
        status: true,
        pages: true,
        publicationYear: true,
        accountability: true
      }
    }

    const params: IFilter = {
      isDraft: req.body.isDraft || false,
      $and: [],
      ...filter
    }

    if (req.body.unlistedOf) {
      params['lists'] = { $size: 0 }
      params['genres'] = {
        $elemMatch: { $eq: new Types.ObjectId(req.body.unlistedOf) }
      }
    }

    if (req.body.accountableOnly) {
      params['$and'].push({
        $or: [
          { accountability: { $exists: false } },
          { accountability: { $eq: true } }
        ]
      })
    }

    if (req.body.paperWithoutFile) {
      params['format'] = { $eq: 'paperbook' }
      params['$and'].push({
        $or: [
          { file: { $exists: false } },
          { file: { $eq: null } },
          { file: { $eq: '' } }
        ]
      })
    }

    if (!params['$and'].length) {
      delete params['$and']
    }

    const response = await Book.paginate(params, options)

    return {
      docs: response.docs.map((doc) => new BookItemDTO(doc)),
      pagination: new PaginationDTO(response)
    }
  }

  async page(id?: string) {
    if (!id) throw new Error('Param \'id\' is not defined')

    const book: BookModel = await Book.findById(id)
      .populate({ path: 'genres', select: ['title', '_id'] })
      .populate({ path: 'series', select: ['title', '_id'] })
      .populate({ path: 'lists', select: ['title', '_id', 'lists'] })
      .populate({ path: 'authors.author', select: ['title', '_id'] })
      .populate({ path: 'publishers.publisher', select: ['title', '_id'] })
      .lean()

    if (book.preCoverImage && book.dateModified) {
      const currentServerDate = new Date().getTime()
      const bookModifiedTime = new Date(book.dateModified).getTime()
      const timeDifference = (currentServerDate - bookModifiedTime) / 60_000

      if (timeDifference > 10) {
        commonService.removeMediaFile(book.preCoverImage)
        await this.cleanPreCoverField(id)
        delete book.preCoverImage
      }
    }

    return new BookPageDTO(book)
  }

  async upload(req: Request) {
    const cover = req.file
      ? `/uploads/covers/${req.file.filename}`
      : req.body.preCoverImage

    const book: BookModel = await Book.findById(req.params['id']).lean()

    if (book.preCoverImage) {
      commonService.removeMediaFile(book.preCoverImage)
    }

    const $set = {
      preCoverImage: cover,
      dateModified: new Date()
    }

    const updatedBook = await Book.findOneAndUpdate({
      _id: req.params['id']
    }, { $set }, { new: true })

    if (updatedBook) {
      return new BookPageDTO(updatedBook)
    }

    throw { message: 'book.updateError' }
  }

  async update(payload: Partial<BookPageDTO>, _id?: string) {
    if (!_id) throw new Error('Param \'id\' is not defined')
    const originalBook = await Book.findById(_id).lean()
    console.log(originalBook)
    console.log(payload)
    return true
    // const payloadToSave = Object.entries($set).reduce((acc, [key, value]) => {
    //   switch(key) {
    //     case 'authors':
    //       acc[key] = value.reduce((authors, { isDeleted, role, author }) => {
    //         if (isDeleted) {
    //           this.pullFromCategory(key, _id)
    //         } else {
    //           authors.push({
    //             role,
    //             author: author._id
    //           })
    //         }

    //         return authors
    //       }, [] as any)
    //       break
    //     case 'publishers':
    //       acc[key] = value.reduce((publishers, { isDeleted, city, code, publisher }) => {
    //         if (isDeleted) {
    //           this.pullFromCategory(key, _id)
    //         } else {
    //           publishers.push({
    //             city,
    //             code,
    //             publisher: publisher._id
    //           })
    //         }

    //         return publishers
    //       }, [] as any)
    //       break
    //     case 'genres':
    //       acc[key] = (value as any).reduce((genres, { isDeleted, _id }) => {
    //         if (isDeleted) {
    //           this.pullFromCategory(key, _id)
    //         } else {
    //           genres.push(_id)
    //         }

    //         return genres
    //       }, [] as string[])
    //       break
    //     case 'series':
    //       if (value.isDeleted) {
    //         this.pullFromCategory(key, _id)
    //       } else {
    //         acc[key] = value.current._id
    //       }
    //       break
    //     case 'lists':

    //   }

    //   return acc
    // }, {} as any)
    // return payloadToSave
    // return await Book.findOneAndUpdate({ _id }, { $set }, { new: true }) && { isSuccess: true }
  }

  pullFromCategory(categoryName: string, bookId: string) {
    console.log(categoryName, bookId)
  }

  async remove(_id?: string) {
    if (!_id) throw new Error('Param \'id\' is not defined')

    const response = await Book.findById(_id)

    if (response?.authors?.length) {
      response.authors.map(async ({ author }) => (
        await Author.findOneAndUpdate(
          { _id: author },
          { $pull: { books: new Types.ObjectId(_id) } },
          { new: true }
        )
      ))
    }

    if (response?.genres?.length) {
      response.genres.map(async (genre) => (
        await Genre.findOneAndUpdate(
          { _id: genre },
          { $pull: { books: new Types.ObjectId(_id) } },
          { new: true })
      ))
    }

    if (response?.publishers?.length) {
      response.publishers.map(async ({ publisher }) => (
        await Publisher.findOneAndUpdate(
          { _id: publisher },
          { $pull: { books: new Types.ObjectId(_id) } },
          { new: true })
      ))
    }

    if (response?.lists?.length) {
      response.lists.map(async (list) => {
        const doc = await List.findOne({ _id: list }).lean()

        if (doc) {
          const clearedLists: TListSection[] = doc.lists.map((list) => {
            const deletedBookIndex = (list.contents as TListSectionContent[])
              .findIndex((content) => content.book.toString() === _id)

            if (deletedBookIndex > -1) {
              list.contents.splice(deletedBookIndex, 1)
            }

            return list
          })

          await List.findOneAndUpdate(
            { _id: doc._id },
            { $set: { lists: clearedLists } },
            { new: true }
          )
        }
      })
    }

    if (response?.series) {
      await Series.findOneAndUpdate(
        { _id: response.series },
        { $pull: { books: new Types.ObjectId(_id) } },
        { new: true }
      )
    }

    return await Book.findOneAndDelete({ _id })
  }

  cleanPreCoverField(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await Book.updateOne({ _id: id }, { $set: { preCoverImage: '' } })
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default new BookService()
