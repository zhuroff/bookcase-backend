import { Request, Response } from 'express'
import Book from '../models/book.model'

const booksList = async (req: Request, res: Response) => {
  const booksListPopulates = [
    { path: 'relatedAuthors', select: ['title', '_id'] },
    { path: 'relatedGenres', select: ['title', '_id'] },
    { path: 'inList', select: ['title', '_id'] }
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
      readingStatus: true,
      'output.year': true
    }
  }
  
  try {
    const response = await Book.paginate({ isDraft: req.body.isDraft }, booksListOptions)
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  booksList
}

export default controller
