import { Request, Response } from 'express'
import { getCategories } from '../shared/caterories-getters'
import Publisher from '../models/publisher.model'

const create = async (req: Request, res: Response) => {
  const payload = {
    isDraft: req.body.isDraft,
    title: req.body.title,
    books: []
  }

  const publisher = new Publisher(payload)

  try {
    await publisher.save()
    res.status(201).json(publisher)
  } catch(error) {
    res.status(500).json(error)
  }
}

const publishersList = async (req: Request, res: Response) => {
  try {
    const response = await getCategories(req, Publisher)
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  create,
  publishersList
}

export default controller
