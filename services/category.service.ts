import { Request } from 'express'
import { PaginationDTO } from '../dto/pagination.dto'
import { validationResult } from 'express-validator'
import { QueryFilter } from '../types/Common'
import { Pagination, PaginationModel, PaginationOptions } from 'mongoose-paginate-ts'
import bookService from './book.service'

class CategoryService {
  async create<T>(req: Request, Model: Pagination<T>) {
    const entity = new Model(req.body)
    return await entity.save()
  }

  async list<T, U>(
    req: Request,
    Model: Pagination<T>,
    select: { [index: string]: boolean } = {}
  ) {
    const options: PaginationOptions = {
      page: req.body.page,
      sort: req.body.sort,
      limit: req.body.limit,
      lean: true,
      query: {
        isDraft: req.body.isDraft
      },
      select: {
        title: true,
        isDraft: true,
        books: true,
        ...select
      }
    }

    const response = await Model.paginate(options) as PaginationModel<U> | undefined

    if (!response) {
      throw new Error('Cannot get list')
    }

    return {
      docs: response.docs,
      pagination: new PaginationDTO(response.totalDocs, response.totalPages, response.page)
    }
  }

  async page<T, U>(req: Request, bookFilter: QueryFilter, Model: Pagination<T>) {
    const category = await Model.findById<U>(req.params['id']).lean()
    const books = await bookService.list(req, bookFilter, { title: 1 })
    return { category, books }
  }

  async update<T>(req: Request, Model: Pagination<T>, requiredFields: string[]) {
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

  async remove<T>(_id: string, Model: Pagination<T>) {
    return await Model.deleteOne({ _id })
  }
}

export default new CategoryService()
