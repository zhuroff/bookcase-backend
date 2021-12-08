import { Schema, Date } from 'mongoose'

interface BookAuthor {
  author: Schema.Types.ObjectId
  role: string
}

interface BookPublishers {
  publisher: Schema.Types.ObjectId
  city: string
  code: string
}

interface BooksLinks {
  url: string
  title: string
}

interface ReadingStatus {
  start: Date | null
  finish: Date | null
  process: string
}

interface BookModel {
  _id?: string
  isDraft: boolean
  title: string
  subtitle: string
  article?: string
  authors: BookAuthor[]
  genres: Schema.Types.ObjectId[]
  series: Schema.Types.ObjectId
  publishers: BookPublishers[]
  format: string
  contents?: string
  coverImage: string | Blob | null
  coverType: string
  dateCreated: Date
  description?: string
  file?: string
  links: BooksLinks[]
  publicationYear: number,
  pages: number,
  rating: number
  status: ReadingStatus
  inList: Schema.Types.ObjectId[]
}

export {
  ReadingStatus,
  BookModel
}