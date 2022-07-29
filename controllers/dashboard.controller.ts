import { Request, Response } from 'express'
import { ISort, IFilter } from 'types/Common'
import { Book } from '../models/book.model'
import { Genre } from '../models/genre.model'
import { List } from '../models/list.model'
import bookService from '../services/book.service'

// const bookFieldsConfig = {
//   title: true,
//   coverImage: true,
//   pages: true,
//   status: true
// }

class DashboardController {
  async reading(req: Request, res: Response) {
    try {
      const filter: IFilter = {
        'status.start': { $ne: null },
        'status.finish': { $eq: null }
      }
      const sort: ISort = { 'status.start': -1 }
      const response = await bookService.list(req, filter, sort)

      res.json(response)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async read(req: Request, res: Response) {
    try {
      const filter: IFilter = {
        'status.finish': {
          $gte: `${req.body.year}-01-01`,
          $lte: `${req.body.year}-12-31`
        }
      }
      const sort: ISort = { 'status.finish': -1 }
      const response = await bookService.list(req, filter, sort)

      res.json(response)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

// const readingNow = async (req: Request, res: Response) => {
//   const filter = {
//     isDraft: false,
//     'status.start': { $ne: null },
//     'status.finish': { $eq: null }
//   }

//   try {
//     const response = await Book.find(filter, bookFieldsConfig)
//       .populate({ path: 'genres', select: ['title', '_id'] })
//       .populate({ path: 'lists', select: ['title', '_id', 'lists] })
//       .populate({ path: 'authors.author', select: ['title', '_id', 'firstName', 'lastName', 'patronymicName'] })
//       .sort({ 'status.start': -1 })

//     res.json(response)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

// const readCompletely = async (req: Request, res: Response) => {
//   const filter = {
//     isDraft: false,
//     'status.finish': {
//       $gte: `${req.body.year}-01-01`,
//       $lte: `${req.body.year}-12-31`
//     }
//   }

//   try {
//     const response = await Book.find(filter, bookFieldsConfig)
//       .populate({ path: 'genres', select: ['title', '_id'] })
//       .populate({ path: 'lists', select: ['title', '_id', 'lists] })
//       .populate({ path: 'authors.author', select: ['title', '_id'] })
//       .sort({ 'status.finish': -1 })

//     res.json(response)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }

const genresDiagram = async (req: Request, res: Response) => {
  try {
    const response = await Genre.find({ isDraft: false }, { title: true })
      .populate({
        path: 'books',
        select: ['title'],
        match: { 'status.finish': { $ne: null } }
      })

    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const bookTypesDiagram = async (req: Request, res: Response) => {
  try {
    const response = await Book.find({ isDraft: false }, { bookFormat: true })

    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const listsProgress = async (req: Request, res: Response) => {
  try {
    const response = await List.find({ isDraft: false }, { title: true })
      .populate({
        path: 'lists.contents.book',
        select: ['title', 'status']
      })

    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  genresDiagram,
  bookTypesDiagram,
  listsProgress
}

console.log(controller)

export default new DashboardController()
