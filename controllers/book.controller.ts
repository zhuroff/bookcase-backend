import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import Book from '../models/book.model'
import { BookModel } from '../types/Book'

interface MulterRequest extends Request {
  file: any
}

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

const setPreCover = async (req: Request, res: Response) => {
  try {
    const cover = (req as MulterRequest).file
      ? `/covers/${(req as MulterRequest).file.filename}`
      : req.body.preCoverImage

    const $set = {
      preCoverImage: cover
    }

    await Book.findOneAndUpdate({
      _id: req.params.id
    }, { $set }, { new: true })

    res.json({ preCoverImage: cover })
  } catch (error) {
    res.status(500).json(error)
  }
}

const removePreCover = async (req: Request, res: Response) => {
  console.log('Here')
  try {
    await Book.findById(
      req.params.id,
      async (error: Error, data: BookModel) => {
        if (error) {
          return res.status(500).json(error)
        }

        const filename = data.preCoverImage as string

        await Book.updateOne(
          { _id: req.params.id },
          { $unset: { preCoverImage: '' }
        }).clone()

        fs.rm(
          path.join(__dirname, '../uploads', filename),
          { recursive: true },
          (err) => {
            if (err) {
              return res.status(500).json(err)
            }
          }
        )
      }
    ).clone()

    res.json({ success: true })
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  booksList,
  bookItem,
  setPreCover,
  removePreCover
}

export default controller
