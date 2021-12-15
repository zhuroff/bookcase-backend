import { Request } from 'express'
import { Model, PaginateModel } from 'mongoose'
import Book from '../models/book.model'
import Genre from '../models/genre.model'
import Author from '../models/author.model'
import Series from '../models/series.model'
import List from '../models/list.model'

const bookPopulate = {
  path: 'relatedBooks',
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
    select: {
      title: true,
      dateCreated: true,
      isDraft: true
    }
  }
  return await Model.paginate({ isDraft: req.body.isDraft }, options)
}

const getCategory = async (req: Request, fields: object, Model: Model<any, {}, {}>) => {
  const response = await Model.findById(req.params.id, fields).populate(bookPopulate)
  return response
}

export {
  getCategories,
  getCategory
}
