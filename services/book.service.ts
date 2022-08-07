import { Request } from 'express'
import { Types } from 'mongoose'
import { BookModel, BookModelPayload } from '../types/Book'
import { ListModel, TListSection, TListSectionContent } from '../types/List'
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
import { AuthorBookPage, AuthorBookPagePayload, CategoryModel, PublisherBookPage, PublisherBookPagePayload } from 'types/Category'

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

  async update(payload: Partial<BookPageDTO>, bookId?: string) {
    if (!bookId) throw new Error('Param \'id\' is not defined')

    const originalBook = await Book.findById(bookId).lean()
    console.log(originalBook)

    const payloadToSave = Object.entries(payload).reduce((acc, [key, value]) => {
      switch (key) {
        case 'authors':
          acc[key] = (value as AuthorBookPage[]).reduce((authors, { isDeleted, isAdded, isChanged, role, author }) => {
            if (isDeleted) {
              console.log('author deleted', author)
            } else if (isAdded) {
              console.log('author added', author)
              authors.push({
                role,
                author: new Types.ObjectId(author._id)
              })
            } else if (isChanged) {
              console.log('author changed', author)
              authors.push({
                role,
                author: new Types.ObjectId(author._id)
              })
            } else {
              console.log('author not changed', author)
              authors.push({
                role,
                author: new Types.ObjectId(author._id)
              })
            }

            return authors
          }, [] as AuthorBookPagePayload[])
          break
        case 'publishers':
          acc[key] = (value as PublisherBookPage[]).reduce((publishers, { isDeleted, isAdded, isChanged, city, code, publisher }) => {
            if (isDeleted) {
              console.log('publisher deleted', publisher)
            } else if (isAdded) {
              console.log('publisher added', publisher)
              publishers.push({
                city,
                code,
                publisher: new Types.ObjectId(publisher._id)
              })
            } else if (isChanged) {
              console.log('publisher changed', publisher)
              publishers.push({
                city,
                code,
                publisher: new Types.ObjectId(publisher._id)
              })
            } else {
              publishers.push({
                city,
                code,
                publisher: new Types.ObjectId(publisher._id)
              })
            }

            return publishers
          }, [] as PublisherBookPagePayload[])
          break
        case 'genres':
          acc[key] = (value as CategoryModel[]).reduce((genres, { isDeleted, isAdded, isChanged, title, _id }) => {
            if (isDeleted) {
              console.log('genre deleted', title)
            } else if (isAdded) {
              console.log('genre added', title)
              genres.push(new Types.ObjectId(_id))
            } else if (isChanged) {
              console.log('genre changed', title)
              genres.push(new Types.ObjectId(_id))
            } else {
              genres.push(new Types.ObjectId(_id))
            }

            return genres
          }, [] as Types.ObjectId[])
          break
        case 'series':
          if ((value as CategoryModel).isDeleted) {
            console.log('series deleted', value)
          } else if ((value as CategoryModel).isAdded) {
            console.log('series added', value)
            acc[key] = new Types.ObjectId((value as CategoryModel)._id)
          } else if ((value as CategoryModel).isChanged) {
            console.log('series changed', value)
            acc[key] = new Types.ObjectId((value as CategoryModel)._id)
          } else {
            acc[key] = new Types.ObjectId((value as CategoryModel)._id)
          }
          break
        case 'lists':
          acc[key] = (value as ListModel[]).reduce((items, { isDeleted, isAdded, isChanged, _id }) => {
            if (isDeleted) {
              console.log('list deleted', _id)
            } else if (isAdded) {
              console.log('list added', _id)
              items.push(new Types.ObjectId(_id))
            } else if (isChanged) {
              console.log('list changed', _id)
              items.push(new Types.ObjectId(_id))
            } else {
              items.push(new Types.ObjectId(_id))
            }

            return items
          }, [] as Types.ObjectId[])
          break
        case 'preCoverImage':
          acc.coverImage = value as string
          acc.preCoverImage = undefined
        default:
          // @ts-ignore
          acc[key] = value
      }
      return acc
    }, {} as Partial<BookModelPayload>)

    console.log(payloadToSave)
    return true
    // return await Book.findOneAndUpdate({ _id: bookId }, { $set: payloadToSave }, { new: true }) && { isSuccess: true }
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
