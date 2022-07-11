import { Request, Response } from 'express'
import { PaginateModel } from 'mongoose'
import { Author } from '../models/author.model'
import Genre from '../models/genre.model'
import Publisher from '../models/publisher.model'
import Series from '../models/series.model'
import { Book } from '../models/book.model'

interface SearchModels {
  [index: string]: PaginateModel<any>
}

const searchModels: SearchModels = {
  authors: Author,
  genres: Genre,
  publishers: Publisher,
  series: Series,
  books: Book
}

const basicOptions = {
  _id: true,
  title: true
}

const search = async (req: Request, res: Response) => {
  const params = {
    isDraft: false,
    $text: { $search: req.body.query }
  }

  try {
    const response = req.body.collection
      ? await searchModels[req.body.collection].find(params, basicOptions)
      : await Promise.all(Object.entries(searchModels).map(async ([key, model]) => (
        {
          [key]: key === 'books'
            ? await model.find(params, { ...basicOptions, subtitle: true })
              .populate({
                path: 'authors.author',
                select: ['title', '_id', 'firstName', 'lastName', 'patronymicName']
              })
            : await model.find(params, basicOptions)
        }
      )))

    res.json(response.filter((result) => Object.values(result).flat().length > 0))
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  search
}

export default controller
