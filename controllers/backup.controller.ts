import { Request, Response } from 'express'
import { PaginateModel } from 'mongoose'
import { WritingOptions } from 'xlsx'
import fs from 'fs'
import path from 'path'
import xlsx from 'json-as-xlsx'
import Book from '../models/book.model'
import Author from '../models/author.model'
import Genre from '../models/genre.model'
import List from '../models/list.model'
import Publisher from '../models/publisher.model'
import Series from '../models/series.model'

type BackupModel = {
  [index: string]: PaginateModel<any>
}

const backupModels: BackupModel = {
  books: Book,
  authors: Author,
  genres: Genre,
  lists: List,
  publishers: Publisher,
  series: Series
}

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

const list = (req: Request, res: Response) => {
  try {
    fs.readdir(
      path.join(__dirname, '../backups'),
      (error, files) => {
        if (error) return error
        res.json(files)
      }
    )
  } catch (error) {
    res.status(500).json(error)
  }
}

const tableColumns = (obj: any) => {
  return Object.keys(obj).map((el: string) => ({
    label: el,
    value: ''
  }))
}

const backupsXLSX = async (req: Request, res: Response) => {
  try {
    const modelKey = req.params?.model
    const fileSettings = {
      fileName: `bookcase_${modelKey}`,
      writeOptions: {
        type: 'buffer',
        bookType: 'xlsx'
      } as WritingOptions
    }
    const fileContent: any = await readBackupFile(`${modelKey}.json`)
    const filePayload = {
      sheet: modelKey,
      columns: tableColumns(fileContent[0]),
      content: fileContent
    }

    const buffer = xlsx([filePayload], fileSettings)

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-disposition': `attachment; filename=${fileSettings.fileName}.xlsx`
    })

    res.end(buffer)
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupSave = async (req: Request, res: Response) => {
  try {
    const modelKey = req.params?.model
    const Model = backupModels[modelKey]
    const response = await Model.find({}).lean()

    await writeBackupFile(`${modelKey}.json`, response)

    res.json({ message: `${modelKey} data backup completed successfully` })
  } catch (error) {
    res.status(500).json(error)
  }
}

const backupRestore = async (req: Request, res: Response) => {
  try {
    const modelKey = req.params?.model
    const Model = backupModels[modelKey]
    const fileContent: any = await readBackupFile(`${modelKey}.json`)

    await Model.deleteMany({})
    await Model.insertMany(fileContent)

    res.json({ message: `${modelKey} data recovery completed successfully` })
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  list,
  backupsXLSX,
  backupSave,
  backupRestore
}

export default controller
