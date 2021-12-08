import { Request, Response } from 'express'
import Book from '../models/book.model'

const booksList = async (req: Request, res: Response) => {
  const booksListPopulates = [
    { path: 'genres', select: ['title', '_id'] },
    { path: 'inList', select: ['title', '_id'] },
    { path: 'authors.author', select: ['title', '_id'] }
  ]
  const booksListOptions = {
    page: req.body.page,
    sort: req.body.sort,
    limit: req.body.limit,
    populate: booksListPopulates,
    select: {
      title: true,
      isDraft: true,
      subtitle: true,
      coverImage: true,
      dateCreated: true,
      status: true,
      publicationYear: true
    }
  }
  
  try {
    const response = await Book.paginate({ isDraft: req.body.isDraft }, booksListOptions)
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const bookItem = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate({ path: 'genres', select: ['title', '_id'] })
      .populate({ path: 'series', select: ['title', '_id'] })
      .populate({ path: 'inList', select: ['title', '_id'] })
      .populate({ path: 'authors.author', select: ['title', '_id'] })
      .populate({ path: 'publishers.publisher', select: ['title', '_id'] })
      
    res.json(book)
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  booksList,
  bookItem
}

export default controller
