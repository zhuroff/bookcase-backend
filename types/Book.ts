import { Schema, Date } from 'mongoose'

interface BookAuthor {
  author: Schema.Types.ObjectId
  role: string
}

interface BookPublisher {
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
}

interface BookModel {
  _id?: string
  isDraft: boolean
  title: string
  subtitle: string
  summary?: string
  authors: BookAuthor[]
  genres: Schema.Types.ObjectId[]
  series: Schema.Types.ObjectId
  publishers: BookPublisher[]
  format: string
  contents?: string
  coverImage: string | null
  preCoverImage: string | undefined
  coverType: string
  dateCreated: string,
  dateModified: string,
  description?: string
  file?: string
  links: BooksLinks[]
  publicationYear: number,
  pages: number,
  rating: number
  status: ReadingStatus
  lists: Schema.Types.ObjectId[]
}

export {
  ReadingStatus,
  BookAuthor,
  BookPublisher,
  BookModel
}