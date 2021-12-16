import { Request, Response } from 'express'
import { BookModel } from '../types/Book'
import fs from 'fs'
import path from 'path'
import Book from '../models/book.model'

interface MulterRequest extends Request {
  file: any
}

const removeMediaFile = (filename: string) => {
  fs.rm(
    path.join(__dirname, '../', filename),
    { recursive: true },
    (error) => {
      if (error) {
        throw new Error(error.message)
      }
    }
  )
}

const cleanPreCoverField = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Book.updateOne({ _id: id }, { $set: { preCoverImage: '' }})
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

const update = async (req: Request, res: Response) => {
  const $set = {
    summary: req.body.summary,
    rating: req.body.rating,
    status: JSON.parse(req.body.status),
    dateModified: new Date()
  }

  try {
    const result = await Book.findOneAndUpdate({
      _id: req.params.id
    }, { $set }, { new: true })

    res.json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

const booksList = async (req: Request, res: Response) => {
  const booksListPopulates = [
    { path: 'genres', select: ['title', '_id'] },
    { path: 'lists', select: ['title', '_id'] },
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
    const book: BookModel = await Book.findById(req.params.id)
      .populate({ path: 'genres', select: ['title', '_id'] })
      .populate({ path: 'series', select: ['title', '_id'] })
      .populate({ path: 'lists', select: ['title', '_id'] })
      .populate({ path: 'authors.author', select: ['title', '_id'] })
      .populate({ path: 'publishers.publisher', select: ['title', '_id'] })
      .lean()
    
    if (book.preCoverImage) {
      const currentServerDate = new Date().getTime()
      const bookModifiedTime = new Date(book.dateModified).getTime()
      const timeDifference = (currentServerDate - bookModifiedTime) / 60_000
      
      if (timeDifference > 10) {
        removeMediaFile(book.preCoverImage)
        cleanPreCoverField(req.params.id)
        delete book.preCoverImage
      }
    }
      
    res.json(book)
  } catch (error) {
    res.status(500).json(error)
  }
}

const setPreCover = async (req: Request, res: Response) => {
  try {
    const cover = (req as MulterRequest).file
      ? `/uploads/covers/${(req as MulterRequest).file.filename}`
      : req.body.preCoverImage

    const $set = {
      preCoverImage: cover,
      dateModified: new Date()
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
  Book.findById(req.params.id, { preCoverImage: true })
    .then((book: any) => book.preCoverImage)
    .then((filename: string) => {
      removeMediaFile(filename)
      cleanPreCoverField(req.params.id)
        .then(() => res.json({ success: true }))
    })
    .catch((error: Error) => res.status(500).json(error))
}

const setArticleImage = async (req: Request, res: Response) => {
  try {
    const image = (req as MulterRequest).file
      ? `/uploads/articles/${(req as MulterRequest).file.filename}`
      : null

    res.json({ articleImage: image })
  } catch (error) {
    res.status(500).json(error)
  }
}

const removeArticleImage = async (req: Request, res: Response) => {
  const payload = JSON.parse(req.body.urls)

  try {
    const deletedImages = payload.map((el: string) => (
      removeMediaFile(el)
    ))

    res.json({ deleted: deletedImages })
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  update,
  booksList,
  bookItem,
  setPreCover,
  removePreCover,
  setArticleImage,
  removeArticleImage
}

export default controller
