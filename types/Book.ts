import { Date, Document, Types } from 'mongoose'
import { PaginationModel } from 'mongoose-paginate-ts'
import { AuthorBookItem } from './Category'
import { IEntityBasic } from './Common'
import { ListDocument } from './List'

export type BookLinks = {
  url: string
  title: string
  _id: Types.ObjectId
}

export type ReadingStatus = {
  start: Date | null
  finish: Date | null
}

export type BookDocument = Document & {
  isDraft: boolean
  title: string
  subtitle?: string
  summary?: string
  format: string
  contents?: string
  coverImage?: string
  preCoverImage?: string
  coverType: string
  dateCreated: Date
  dateModified?: string
  description: string
  file?: string
  links?: BookLinks[]
  publicationYear: number
  pages: number
  rating?: number
  status: ReadingStatus
  accountability?: boolean
  authors: {
    author: Types.ObjectId
    role: string
  }[]
  publishers: {
    publisher: Types.ObjectId
    city: string
    code: string
  }[]
  genres: Types.ObjectId[]
  lists: Types.ObjectId[]
  notes?: Types.ObjectId[]
  series: Types.ObjectId
}

export type PopulatedBookItemModels = {
  authors: { author: AuthorBookItem }[]
  genres: IEntityBasic[]
  lists: ListDocument[]
}

export type BookDocumentResponse = Omit<BookDocument, 'authors' | 'genres' | 'lists'> & PopulatedBookItemModels
export type BookItemResponse = PaginationModel<BookDocumentResponse> | undefined
