import { Request } from 'express'
import { Model, PaginateModel } from 'mongoose'
import { Book } from '../models/book.model'
import Genre from '../models/genre.model'
import { Author } from '../models/author.model'
import Series from '../models/series.model'
import List from '../models/list.model'
import { CategoryItemDTO, CategoryAuthorItemDTO } from '../dto/category.dto'
import { PaginationDTO } from '../dto/pagination.dto'

const bookPopulate = {
  path: 'books',
  model: Book,
  select: [
    '_id',
    'title',
    'subtitle',
    'coverImage',
    'publicationYear',
    'format',
    'coverType',
    'status'
  ],
  populate: [
    { path: 'genres', select: ['title', '_id'], model: Genre },
    { path: 'authors', select: ['title', '_id'], model: Author },
    { path: 'series', select: ['title', '_id'], model: Series },
    { path: 'lists', select: ['title', '_id'], model: List }
  ]
}

const getCategories = async (req: Request, Model: PaginateModel<any>) => {
  const options = {
    page: req.body.page,
    sort: req.body.sort,
    limit: req.body.limit,
    lean: true,
    select: {
      title: true,
      isDraft: true,
      books: true
    }
  }

  if (req.baseUrl.includes('authors')) {
    options.select = {
      ...options.select,
      // @ts-ignore
      firstName: true,
      lastName: true,
      patronymicName: true
    }
  }

  const response = await Model.paginate({ isDraft: req.body.isDraft }, options)

  return {
    docs: response.docs.map((doc) => (
      req.baseUrl.includes('authors')
        ? new CategoryAuthorItemDTO(doc)
        : new CategoryItemDTO(doc)
    )),
    pagination: new PaginationDTO(response)
  }
}

const getCategory = async (req: Request, fields: object, Model: Model<any, {}, {}>) => {
  const response = await Model.findById(req.params.id, fields).populate(bookPopulate)
  return response
}

export {
  getCategories,
  getCategory
}
