import { Request, Response } from 'express'
import { getCategories } from '../shared/caterories-getters'
import Series from '../models/series.model'

const seriesList = async (req: Request, res: Response) => {
  try {
    const response = await getCategories(req, Series)
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  seriesList
}

export default controller
