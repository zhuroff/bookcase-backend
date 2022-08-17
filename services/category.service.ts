import { Request } from 'express'
import { Model, PaginateModel } from 'mongoose'
import { Book } from '../models/book.model'
import { PaginationDTO } from '../dto/pagination.dto'
import { validationResult } from 'express-validator'

class CategoryService {
  async create<T>(req: Request, Model: Model<T, {}, {}>) {
    const entity = new Model(req.body)
    return await entity.save()
  }

  async list<T>(
    req: Request,
    Model: PaginateModel<T>,
    selectExtends: { [index: string]: boolean } = {}
  ) {
    const options = {
      page: req.body.page,
      sort: req.body.sort,
      limit: req.body.limit,
      lean: true,
      select: {
        title: true,
        isDraft: true,
        books: true,
        ...selectExtends
      }
    }

    const response = await Model.paginate({ isDraft: req.body.isDraft }, options)

    return {
      docs: response.docs,
      pagination: new PaginationDTO(response)
    }
  }

  async page<T>(req: Request, Model: Model<T, {}, {}>) {
    const response = await Model.findById(req.params['id'])
      .populate({
        path: 'books',
        model: Book,
        select: [
          'title',
          'subtitle',
          '_id',
          'coverImage',
          'status',
          'pages',
          'publicationYear',
          'accountability'
        ],
        populate: [
          { path: 'genres', select: ['title', '_id'] },
          { path: 'lists', select: ['title', '_id', 'lists'] },
          { path: 'authors.author', select: ['title', '_id', 'firstName', 'lastName', 'patronymicName'] }
        ]
      })
      .lean()

    return response
  }

  async update<T>(req: Request, Model: Model<T, {}, {}>, requiredFields: string[]) {
    const errors = validationResult(req)
    const query = { _id: req.params['id'] }
    const $set = req.body

    if (!$set.isDraft) {
      const entity = await Model.findById<T>(req.params['id']).lean().exec()
      const invalidByRequired = requiredFields.reduce((acc, next) => {
        if (!Object.prototype.hasOwnProperty.call(entity, next) && !$set[next]) {
          acc += 1
        }
        return acc
      }, 0)

      if (invalidByRequired > 0 && !errors.isEmpty()) {
        throw errors.array()
      }
    }

    await Model.findOneAndUpdate(query, { $set }, { new: true })

    return { isSuccess: true }
  }

  async remove<T>(_id: string, Model: Model<T, {}, {}>) {
    return await Model.deleteOne({ _id })
  }
}

export default new CategoryService()
