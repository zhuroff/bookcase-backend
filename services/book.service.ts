import { Request } from 'express'
import { Types } from 'mongoose'
import { BookModel } from '../types/Book'
import { Book } from '../models/book.model'
import { ISort, IFilter } from 'types/Common'
import { BookItemDTO, BookPageDTO } from '../dto/book.dto'
import { PaginationDTO } from '../dto/pagination.dto'
import fs from 'fs'
import path from 'path'

class BookService {
  async list(req: Request, filter: IFilter = {}, sort?: ISort) {
    const booksListPopulates = [
      { path: 'genres', select: ['title', '_id'] },
      { path: 'lists', select: ['title', '_id'] },
      { path: 'authors.author', select: ['title', '_id', 'firstName', 'lastName', 'patronymicName'] }
    ]

    const booksListOptions: IFilter = {
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
        publicationYear: true
      }
    }

    const bookListParams: IFilter = {
      isDraft: req.body.isDraft || false,
      ...filter
    }

    if (req.body.unlistedOf) {
      bookListParams.genres = {
        $elemMatch: { $eq: new Types.ObjectId(req.body.unlistedOf) }
      }

      bookListParams.lists = { $size: 0 }
    }

    if (req.body.paperWithoutFile) {
      bookListParams.format = { $eq: 'paperbook' }
      bookListParams.$or = [
        { file: { $exists: false } },
        { file: { $eq: null } },
        { file: { $eq: '' } }
      ]
    }

    const response = await Book.paginate(bookListParams, booksListOptions)

    return {
      docs: response.docs.map((doc) => new BookItemDTO(doc)),
      pagination: new PaginationDTO(response)
    }
  }

  async item(id: string) {
    const book: BookModel = await Book.findById(id)
      .populate({ path: 'genres', select: ['title', '_id'] })
      .populate({ path: 'series', select: ['title', '_id'] })
      .populate({ path: 'lists', select: ['title', '_id'] })
      .populate({ path: 'authors.author', select: ['title', '_id'] })
      .populate({ path: 'publishers.publisher', select: ['title', '_id'] })
      .lean()

    if (book.preCoverImage && book.dateModified) {
      const currentServerDate = new Date().getTime()
      const bookModifiedTime = new Date(book.dateModified).getTime()
      const timeDifference = (currentServerDate - bookModifiedTime) / 60_000

      if (timeDifference > 10) {
        this.removeMediaFile(book.preCoverImage)
        await this.cleanPreCoverField(id)
        delete book.preCoverImage
      }
    }

    return new BookPageDTO(book)
  }

  async save($set: BookModel, _id: string) {
    return await Book.findOneAndUpdate({ _id }, { $set }, { new: true }) && { isSuccess: true }
  }

  removeMediaFile(filename: string) {
    fs.rm(
      path.join(__dirname, '../', filename),
      { recursive: true },
      (error) => {
        if (error) {
          throw new Error(error.message)
        }
      }
    )
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
