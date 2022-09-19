import { Date, Document, Types } from 'mongoose'
import { ReadingStatus } from './book'

export type ArticleReference = {
  link?: string
  text?: string
}

export type ArticleDocument = Document & {
  isDraft: boolean
  title: string
  subtitle?: string
  description?: string
  summary?: string
  dateCreated: Date
  file?: string
  status: ReadingStatus
  authors: {
    author: Types.ObjectId
    role: string
  }[]
  genres: Types.ObjectId[]
  lists: Types.ObjectId[]
  reference?: ArticleReference
  notes?: Types.ObjectId[]
}
