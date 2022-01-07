import { Request, Response } from 'express'
import { getCategories } from '../shared/caterories-getters'
import List from '../models/list.model'
// import Author from '../models/author.model'

const listsCollections = async (req: Request, res: Response) => {
  try {
    const response = await getCategories(req, List)
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const listShort = async (req: Request, res: Response) => {
  try {
    const filter = {
      'lists.title': true,
      'lists._id': true
    }
    const response = await List.findById(req.params.id, filter)
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const listFull = async (req: Request, res: Response) => {
  try {
    const response = await List.findById(req.params.id)
      .populate({
        path: 'lists.contents.book',
        select: [
          '_id',
          'title',
          'subtitle',
          'coverImage',
          'status'
        ],
        populate: [
          { path: 'authors.author', select: ['title', '_id'] }
        ]
      })
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  listsCollections,
  listShort,
  listFull
}

export default controller
