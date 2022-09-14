import { Request } from 'express'
import { Types } from 'mongoose'
import { PaginationOptions } from 'mongoose-paginate-ts'
import { QuerySort, QueryFilter } from '../types/Common'
import { CategoryDocument } from 'types/Category'
import { BookDocument, BookItemPaginated, BookPageResponse } from '../types/Book'
import { ListDocument } from '../types/List'
import { Book } from '../models/book.model'
import { Author } from '../models/author.model'
import { Genre } from '../models/genre.model'
import { Publisher } from '../models/publisher.model'
import { Series } from '../models/series.model'
import { List } from '../models/list.model'
import { BookItemDTO, BookPageDTO } from '../dto/book.dto'
import { PaginationDTO } from '../dto/pagination.dto'
import commonService from './common.service'

class BookService {
  async list(req: Request, filter: QueryFilter = {}, sort?: QuerySort) {
    const options: PaginationOptions = {
      lean: true,
      sort: sort || req.body.sort,
      page: req.body.page || 1,
      limit: req.body.limit || 30,
      query: {
        isDraft: req.body.isDraft || false,
        $and: [],
        ...filter
      },
      select: {
        title: true,
        isDraft: true,
        subtitle: true,
        coverImage: true,
        status: true,
        pages: true,
        publicationYear: true,
        accountability: true
      },
      populate: [
        { path: 'genres', select: ['title', '_id'] },
        { path: 'lists', select: ['title', '_id', 'lists'] },
        { path: 'authors.author', select: ['title', '_id', 'firstName', 'lastName', 'patronymicName'] }
      ]
    }

    if (req.body.unlistedOf) {
      options.query.lists = { $size: 0 }
      options.query.genres = {
        $elemMatch: { $eq: new Types.ObjectId(req.body.unlistedOf) }
      }
    }

    if (req.body.accountableOnly) {
      options.query.$and.push({
        $or: [
          { accountability: { $exists: false } },
          { accountability: { $eq: true } }
        ]
      })
    }

    if (req.body.paperWithoutFile) {
      options.query.format = { $eq: 'paperbook' }
      options.query.$and.push({
        $or: [
          { file: { $exists: false } },
          { file: { $eq: null } },
          { file: { $eq: '' } }
        ]
      })
    }

    if (!options.query.$and.length) {
      delete options.query.$and
    }

    const response = await Book.paginate(options) as BookItemPaginated

    if (!response) {
      throw new Error('Cannot get response')
    }

    return {
      docs: response.docs.map((doc) => new BookItemDTO(doc)),
      pagination: new PaginationDTO(response.totalDocs, response.totalPages, response.page)
    }
  }

  async page(id: string) {
    const book = await Book.findById(id)
      .populate({ path: 'genres', select: ['title'] })
      .populate({ path: 'series', select: ['title'] })
      .populate({ path: 'lists', select: ['title', 'lists'] })
      .populate({ path: 'authors.author', select: ['firstName', 'lastName'] })
      .populate({ path: 'publishers.publisher', select: ['title', '_id'] })
      .lean() as BookPageResponse

    if (book) {
      if (book?.preCoverImage && book?.dateModified) {
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

    throw new Error('Unknown error')
  }

  async upload(req: Request) {
    const cover = req.file
      ? `/uploads/covers/${req.file.filename}`
      : req.body.preCoverImage

    const book: BookDocument = await Book.findById(req.params['id']).lean()

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
      // @ts-ignore
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
          acc[key] = (value as any/* AuthorBookPage[]*/).reduce((authors: any, { isDeleted, isAdded, isChanged, role, author }: any) => {
            if (isDeleted) {
              console.log('author deleted', author)
            } else if (isAdded) {
              console.log('author added', author)
              authors.push({
                role,
                // @ts-ignore
                author: new Types.ObjectId(author._id)
              })
            } else if (isChanged) {
              console.log('author changed', author)
              authors.push({
                role,
                // @ts-ignore
                author: new Types.ObjectId(author._id)
              })
            } else {
              console.log('author not changed', author)
              authors.push({
                role,
                // @ts-ignore
                author: new Types.ObjectId(author._id)
              })
            }

            return authors
          }, [] as any/*AuthorBookPagePayload[]*/)
          break
        case 'publishers':
          acc[key] = (value as any/*PublisherBookPage[]*/).reduce((publishers: any, { isDeleted, isAdded, isChanged, city, code, publisher }: any) => {
            if (isDeleted) {
              console.log('publisher deleted', publisher)
            } else if (isAdded) {
              console.log('publisher added', publisher)
              publishers.push({
                city,
                code,
                // @ts-ignore
                publisher: new Types.ObjectId(publisher._id)
              })
            } else if (isChanged) {
              console.log('publisher changed', publisher)
              publishers.push({
                city,
                code,
                // @ts-ignore
                publisher: new Types.ObjectId(publisher._id)
              })
            } else {
              publishers.push({
                city,
                code,
                // @ts-ignore
                publisher: new Types.ObjectId(publisher._id)
              })
            }

            return publishers
          }, [] as any/*PublisherBookPagePayload[]*/)
          break
        case 'genres':
          // @ts-ignore
          acc[key] = (value as CategoryDocument[]).reduce((genres, { isDeleted, isAdded, isChanged, title, _id }) => {
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
          // @ts-ignore
          if ((value as CategoryDocument).isDeleted) {
            console.log('series deleted', value)
            // @ts-ignore
          } else if ((value as CategoryDocument).isAdded) {
            console.log('series added', value)
            // @ts-ignore
            acc[key] = new Types.ObjectId((value as CategoryDocument)._id)
            // @ts-ignore
          } else if ((value as CategoryDocument).isChanged) {
            console.log('series changed', value)
            // @ts-ignore
            acc[key] = new Types.ObjectId((value as CategoryDocument)._id)
          } else {
            // @ts-ignore
            acc[key] = new Types.ObjectId((value as CategoryDocument)._id)
          }
          break
        case 'lists':
          // @ts-ignore
          acc[key] = (value as ListDocument[]).reduce((items, { isDeleted, isAdded, isChanged, _id }) => {
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
          acc['coverImage'] = value as string
          acc['preCoverImage'] = undefined
        default:
          // @ts-ignore
          acc[key] = value
      }
      return acc
    }, {} as Partial<any/*BookModelPayload*/>)

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
          // @ts-ignore
          { $pull: { books: new Types.ObjectId(_id) } },
          { new: true }
        )
      ))
    }

    if (response?.genres?.length) {
      response.genres.map(async (genre) => (
        await Genre.findOneAndUpdate(
          { _id: genre },
          // @ts-ignore
          { $pull: { books: new Types.ObjectId(_id) } },
          { new: true })
      ))
    }

    if (response?.publishers?.length) {
      response.publishers.map(async ({ publisher }) => (
        await Publisher.findOneAndUpdate(
          { _id: publisher },
          // @ts-ignore
          { $pull: { books: new Types.ObjectId(_id) } },
          { new: true })
      ))
    }

    if (response?.lists?.length) {
      response.lists.map(async (list) => {
        const doc = await List.findOne({ _id: list }).lean()

        if (doc) {
          const clearedLists: any = doc.lists.map((list) => {
            const deletedBookIndex = (list.contents as any[])
              // @ts-ignore
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
        // @ts-ignore
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
