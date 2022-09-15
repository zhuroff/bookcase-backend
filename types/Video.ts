import { Date, Document, Types } from 'mongoose'
import { ReadingStatus } from './Book'

export type VideoDocument = Document & {
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
  notes?: Types.ObjectId[]
}
