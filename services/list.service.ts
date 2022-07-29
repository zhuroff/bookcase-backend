import { Request } from 'express'
import { Book } from '../models/book.model'
import { List } from '../models/list.model'
import { ListItemDTO, ListPageDTO } from '../dto/list.dto'

class ListService {
  async list() {
    const config = {
      title: true,
      isDraft: true,
      lists: true
    }

    const response = await List.find({}, config).sort({ title: 1 })
    return response.map((list) => new ListItemDTO(list))
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
