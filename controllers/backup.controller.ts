import { Request, Response } from 'express'
import { PaginateModel, Model } from 'mongoose'
import { Book } from '../models/book.model'
import { Author } from '../models/author.model'
import { Genre } from '../models/genre.model'
import { List } from '../models/list.model'
import { Publisher } from '../models/publisher.model'
import { Series } from '../models/series.model'
import { User } from '../models/user.model'
import fs from 'fs'
import path from 'path'

type BackupModel = {
  [index: string]: PaginateModel<any> | Model<any, {}, {}>
}

const backupModels: BackupModel = {
  books: Book,
  authors: Author,
  genres: Genre,
  lists: List,
  publishers: Publisher,
  series: Series,
  users: User
}

const createBackupFolder = (folderName: string) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(
      path.join(__dirname, '../backups', folderName),
      (error) => {
        error ? reject(error) : resolve(true)
      }
    )
  })
}

const writeBackupFile = async (fileName: string, folderName: string, data: any) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, '../backups', folderName, fileName),
      JSON.stringify(data),
      (error) => {
        error ? reject(error) : resolve(true)
      }
    )
  })
}

const readBackupFile = (folderName: string, fileName: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, '../backups', folderName, fileName),
      'utf8',
      (error, data) => (
        error ? reject(error) : resolve(JSON.parse(data))
      )
    )
  })
}

const backupList = (req: Request, res: Response) => {
  try {
    const folders = fs.readdirSync(path.join(__dirname, '../backups'))
    res.json(folders)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

const backupSave = async (req: Request, res: Response) => {
  const timestamp = String(new Date().getTime())

  try {
    await createBackupFolder(timestamp)

    const backupProcess = Object.keys(backupModels).map(async (el: string) => {
      const Model = backupModels[el]
      const response = await Model.find({}).lean()

      return await writeBackupFile(`${el}.json`, timestamp, response)
    })

    await Promise.all(backupProcess)
    res.json({ message: 'Data backup completed successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupRestore = async (req: Request, res: Response) => {
  const folderName = req.params.date

  try {
    const restoreProcess = Object.keys(backupModels).map(async (el: string) => {
      const Model = backupModels[el]
      const fileContent: any = await readBackupFile(folderName, `${el}.json`)

      await Model.deleteMany({})
      await Model.insertMany(fileContent)

      return el
    })

    await Promise.all(restoreProcess)
    res.json({ message: 'Data restore completed successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupDelete = (req: Request, res: Response) => {
  const folderName = req.params.date

  try {
    fs.rm(
      path.join(__dirname, '../backups', folderName),
      { recursive: true },
      (error) => {
        if (error) throw new Error(error.message || 'Something went wrong')
        res.json({ message: 'Backup was successfully deleted' })
      }
    )
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const controller = {
  backupList,
  backupSave,
  backupRestore,
  backupDelete
}

export default controller
