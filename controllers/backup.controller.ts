import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import Book from '../models/book.model'
import Author from '../models/author.model'
import Genre from '../models/genre.model'
import List from '../models/list.model'
import Publisher from '../models/publisher.model'
import Series from '../models/series.model'

const writeBackupFile = async (filename: string, data: any) => {
  fs.writeFile(
    path.join(__dirname, '../backups', filename),
    JSON.stringify(data),
    (error) => {
      if (error) return error
    }
  )
}

const backupBooks = async (req: Request, res: Response) => {
  try {
    const response = await Book.find({}).lean()
    await writeBackupFile('books.json', response)

    res.json({ message: 'Books backup successfully done' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupAuthors = async (req: Request, res: Response) => {
  try {
    const response = await Author.find({}).lean()
    await writeBackupFile('authors.json', response)
    
    res.json({ message: 'Authors backup successfully done' })
  } catch (error) {
    res.status(500).json(error);
  }
}

const backupGenres = async (req: Request, res: Response) => {
  try {
    const response = await Genre.find({}).lean()
    await writeBackupFile('genres.json', response)

    res.json({ message: 'Authors backup successfully done' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupLists = async (req: Request, res: Response) => {
  try {
    const response = await List.find({}).lean()
    await writeBackupFile('lists.json', response)

    res.json({ message: 'Lists backup successfully done' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupPublishers = async (req: Request, res: Response) => {
  try {
    const response = await Publisher.find({}).lean()
    await writeBackupFile('publishers.json', response)

    res.json({ message: 'Publishers backup successfully done' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupSeries = async (req: Request, res: Response) => {
  try {
    const response = await Series.find({}).lean()
    await writeBackupFile('series.json', response)

    res.json({ message: 'Series backup successfully done' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  backupBooks,
  backupAuthors,
  backupGenres,
  backupLists,
  backupPublishers,
  backupSeries
}

export default controller
