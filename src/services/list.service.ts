import { Request } from 'express'
import { Book } from '../models/book.model'
import { List } from '../models/list.model'
import { ListPageDTO } from '../dto/list.dto'
// import { PaginationDTO } from '../dto/pagination.dto'

class ListService {
  async list(req: Request) {
    const options = {
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
        lists: true
      }
    }

    const response = await List.paginate(options)

    if (!response) {
      throw new Error('Cannot get response')
    }

    return {
      docs: response.docs,
      // pagination: new PaginationDTO(response)
    }
  }

  async page(req: Request) {
    const response = await List.findById(req.params['id'])
      .populate({
        path: 'lists.contents.book',
        model: Book,
        select: ['title', 'subtitle', '_id', 'coverImage', 'status', 'pages', 'publicationYear', 'accountability'],
        populate: [
          { path: 'genres', select: ['title', '_id'] },
          { path: 'lists', select: ['title', '_id', 'lists'] },
          { path: 'authors.author', select: ['title', '_id', 'firstName', 'lastName', 'patronymicName'] }
        ]
      })

    if (response) {
      return new ListPageDTO(response)
    }

    throw new Error()
  }

  async update(req: Request) {
    const query = { _id: req.params['id'] }
    const $set = req.body

    await List.findOneAndUpdate(query, { $set }, { new: true })

    return { isSuccess: true }
  }
}

export default new ListService()
