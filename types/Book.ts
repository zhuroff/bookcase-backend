import { Date } from 'mongoose'

interface AuthorRole {
  authorID: string
  authorRole: string
}

interface BookOutput {
  cities: string[]
  codes: string[]
  pages: number
  year: number
}

interface ReadingStatus {
  startReading: Date | null
  finishReading: Date | null
  readingProcess: string
}

interface BookCategoryRow {
  _id: string
  collection: string
}

interface Book {
  _id: string
  isDraft: boolean
  article: string | null
  relatedAuthors: string[]
  authorsRole: AuthorRole[]
  bookFormat: string
  contents: string | null
  coverImage: string | Blob | null
  coverType: string
  dateCreated: Date
  description: string | null
  file: string | null
  relatedGenres: string[]
  output: BookOutput
  relatedPublishers: string[]
  rating: number
  readingStatus: ReadingStatus
  relatedSeries: string | null
  inList: string[]
  title: string
  subtitle: string
}

export {
  AuthorRole,
  BookOutput,
  ReadingStatus,
  BookCategoryRow,
  Book
}