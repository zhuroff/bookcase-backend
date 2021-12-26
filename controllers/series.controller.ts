import { Request, Response } from 'express'
import { getCategories } from '../shared/caterories-getters'
import Series from '../models/series.model'

const create = async (req: Request, res: Response) => {
  const payload = {
    isDraft: req.body.isDraft,
    title: req.body.title,
    books: []
  }

  const series = new Series(payload)

  try {
    await series.save()
    res.status(201).json(series)
  } catch(error) {
    res.status(500).json(error)
  }
}

const seriesList = async (req: Request, res: Response) => {
  try {
    const response = await getCategories(req, Series)
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  create,
  seriesList
}

export default controller
