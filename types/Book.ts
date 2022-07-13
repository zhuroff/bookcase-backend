import { PaginateModel, Date, Document } from 'mongoose'
import { CategoryAuthorExtended, CategoryBasic } from './Category'

export type BookPublisher = {
  publisher: CategoryBasic
  city: string
  code: string
}

export type BookLinks = {
  url: string
  title: string
}

export type ReadingStatus = {
  start: Date | null
  finish: Date | null
}

export interface BookModel extends Document {
  isDraft: boolean
  title: string
  subtitle?: string
  accountability?: boolean
  summary?: string
  authors: CategoryAuthorExtended[]
  genres: CategoryBasic[]
  series: CategoryBasic
  publishers: BookPublisher[]
  format: string
  contents?: string
  coverImage?: string
  preCoverImage?: string
  coverType: string
  dateCreated?: Date,
  dateModified?: string
  description?: string
  file?: string
  links: BookLinks[]
  publicationYear: number
  pages: number
  rating: number
  status: ReadingStatus
  lists: CategoryBasic[]
}

export interface IBook<T extends Document> extends PaginateModel<T> { }
