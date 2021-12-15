import { Request, Response } from 'express'
import { getCategories } from '../shared/caterories-getters'
import Genre from '../models/genre.model'

const genresList = async (req: Request, res: Response) => {
  try {
    const response = await getCategories(req, Genre)
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  genresList
}

export default controller
