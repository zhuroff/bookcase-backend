import { Request, Response } from 'express'
import { PaginateModel } from 'mongoose'
import Author from '../models/author.model'
import Genre from '../models/genre.model'
import Publisher from '../models/publisher.model'
import Series from '../models/series.model'

interface SearchModels {
  [index: string]: PaginateModel<any>
}

const searchModels: SearchModels = {
  authors: Author,
  genres: Genre,
  publishers: Publisher,
  series: Series
}

const basicOptions = {
  _id: true,
  title: true,
  dateCreated: true
}

const search = async (req: Request, res: Response) => {
  const params = {
    isDraft: false,
    $text: { $search: req.body.query }
  }

  try {
    const response = await searchModels[req.body.collection].find(params, basicOptions)      
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  search
}

export default controller
