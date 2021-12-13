import { Request, Response } from 'express'
import Book from '../models/book.model'
import Genre from '../models/genre.model'
import List from '../models/list.model'

const bookFieldsConfig = {
  title: true,
  subtitle: true,
  coverImage: true,
  readingStatus: true,
  publishingYear: true
}

const readingNow = async (req: Request, res: Response) => {
  const filter = {
    isDraft: false,
    'status.start': { $ne: null },
    'status.finish': { $eq: null }
  }

  try {
    const response = await Book.find(filter, bookFieldsConfig)
      .populate({ path: 'genres', select: ['title', '_id'] })
      .populate({ path: 'inList', select: ['title', '_id'] })
      .populate({ path: 'authors.author', select: ['title', '_id'] })
      .sort({ 'status.start': -1 })

    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const readCompletely = async (req: Request, res: Response) => {
  const filter = {
    isDraft: false,
    'status.finish': {
      $gte: `${req.body.year}-01-01`,
      $lte: `${req.body.year}-12-31`
    }
  }

  try {
    const response = await Book.find(filter, bookFieldsConfig)
      .populate({ path: 'genres', select: ['title', '_id'] })
      .populate({ path: 'inList', select: ['title', '_id'] })
      .populate({ path: 'authors.author', select: ['title', '_id'] })
      .sort({ 'status.finish': -1 })

    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const genresDiagram = async (req: Request, res: Response) => {
  try {
    const response = await Genre.find({ isDraft: false }, { title: true })
      .populate({
        path: 'relatedBooks',
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
  readingNow,
  readCompletely,
  genresDiagram,
  bookTypesDiagram,
  listsProgress
}

export default controller
