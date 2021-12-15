import { Request, Response } from 'express'
import { getCategories } from '../shared/caterories-getters'
import Publisher from '../models/publisher.model'

const publishersList = async (req: Request, res: Response) => {
  try {
    const response = await getCategories(req, Publisher)
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  publishersList
}

export default controller
