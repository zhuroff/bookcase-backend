import { Request } from 'express'
import { PaginateModel } from 'mongoose'
import { PaginationDTO } from '../dto/pagination.dto'

class CategoryService {
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
}

export default new CategoryService()
