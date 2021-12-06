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

const readBackupFile = (filename: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, '../backups', filename),
      'utf8',
      (error, data) => (
        error ? reject(error) : resolve(JSON.parse(data))
      )
    )
  })
}

const backupBooksSave = async (req: Request, res: Response) => {
  try {
    const response = await Book.find({}).lean()
    await writeBackupFile('books.json', response)

    res.json({ message: 'Books data backup completed successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupAuthorsSave = async (req: Request, res: Response) => {
  try {
    const response = await Author.find({}).lean()
    await writeBackupFile('authors.json', response)
    
    res.json({ message: 'Authors data backup completed successfully' })
  } catch (error) {
    res.status(500).json(error);
  }
}

const backupGenresSave = async (req: Request, res: Response) => {
  try {
    const response = await Genre.find({}).lean()
    await writeBackupFile('genres.json', response)

    res.json({ message: 'Authors data backup completed successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupListsSave = async (req: Request, res: Response) => {
  try {
    const response = await List.find({}).lean()
    await writeBackupFile('lists.json', response)

    res.json({ message: 'Lists data backup completed successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupPublishersSave = async (req: Request, res: Response) => {
  try {
    const response = await Publisher.find({}).lean()
    await writeBackupFile('publishers.json', response)

    res.json({ message: 'Publishers data backup completed successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupSeriesSave = async (req: Request, res: Response) => {
  try {
    const response = await Series.find({}).lean()
    await writeBackupFile('series.json', response)

    res.json({ message: 'Series data backup completed successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupBooksRestore = async (req: Request, res: Response) => {
  try {
    const fileContent: any = await readBackupFile('books.json')
    await Book.deleteMany({})
    await Book.insertMany(fileContent)

    res.json({ message: 'Books data recovery completed successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const backupAuthorsRestore = async (req: Request, res: Response) => {
  try {
    const fileContent: any = await readBackupFile('authors.json')
    await Author.deleteMany({})
    await Author.insertMany(fileContent)

    res.json({ message: 'Authors data recovery completed successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupGenresRestore = async (req: Request, res: Response) => {
  try {
    const fileContent: any = await readBackupFile('genres.json')
    await Genre.deleteMany({})
    await Genre.insertMany(fileContent)

    res.json({ message: 'Genres data recovery completed successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupListsRestore = async (req: Request, res: Response) => {
  try {
    const fileContent: any = await readBackupFile('lists.json')
    await List.deleteMany({})
    await List.insertMany(fileContent)

    res.json({ message: 'Lists data recovery completed successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupPublishersRestore = async (req: Request, res: Response) => {
  try {
    const fileContent: any = await readBackupFile('publishers.json')
    await Publisher.deleteMany({})
    await Publisher.insertMany(fileContent)

    res.json({ message: 'Publishers data recovery completed successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupSeriesRestore = async (req: Request, res: Response) => {
  try {
    const fileContent: any = await readBackupFile('series.json')
    await Series.deleteMany({})
    await Series.insertMany(fileContent)

    res.json({ message: 'Series data recovery completed successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  backupBooksSave,
  backupAuthorsSave,
  backupGenresSave,
  backupListsSave,
  backupPublishersSave,
  backupSeriesSave,
  backupBooksRestore,
  backupAuthorsRestore,
  backupGenresRestore,
  backupListsRestore,
  backupPublishersRestore,
  backupSeriesRestore
}

export default controller
