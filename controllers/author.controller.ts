import { Request, Response } from 'express'
import { getCategories } from '../shared/caterories-getters'
import Author from '../models/author.model'

const authorsList = async (req: Request, res: Response) => {
  try {
    const response = await getCategories(req, Author)
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  authorsList
}

export default controller
