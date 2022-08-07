import { PaginateModel, PopulatedDoc, Date, Document, Types } from 'mongoose'
import { AuthorBookPage, AuthorBookPagePayload, CategoryModel, PublisherBookPage, PublisherBookPagePayload } from './Category'
import { ListModel } from './List'

export type BookLinks = {
  url: string
  title: string
  _id: Types.ObjectId
}

export type ReadingStatus = {
  start: Date | null
  finish: Date | null
}

export interface BookModel extends Document {
  isDraft: boolean
  title: string
  subtitle?: string
  summary?: string
  authors: AuthorBookPage[]
  genres: PopulatedDoc<CategoryModel>[]
  series: PopulatedDoc<CategoryModel>
  publishers: PublisherBookPage[]
  format: string
  contents?: string
  coverImage?: string
  preCoverImage?: string
  coverType: string
  dateCreated?: Date,
  dateModified?: string
  description: string
  file?: string
  links?: BookLinks[]
  publicationYear: number
  pages: number
  rating?: number
  status: ReadingStatus
  lists: PopulatedDoc<ListModel>[]
  accountability?: boolean
}

export type BookModelPayload = Omit<BookModel, 'authors' | 'genres' | 'series' | 'publishers' | 'lists'> & {
  authors: AuthorBookPagePayload[]
  publishers: PublisherBookPagePayload[]
  genres: Types.ObjectId[]
  lists: Types.ObjectId[]
  series: Types.ObjectId
}

export interface IBook<T extends Document> extends PaginateModel<T> { }
