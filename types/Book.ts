// REFACTORED
import { Date, Document, Types } from 'mongoose'
import { PaginationModel } from 'mongoose-paginate-ts'
import { AuthorBookPage, PublisherBookPage } from './Category'
import { EntityBasic } from './Common'
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
  authors: AuthorBookPage[]
  genres: EntityBasic[]
  lists: ListDocument[]
}

export type PopulatedBookPageModels = PopulatedBookItemModels & {
  publishers: PublisherBookPage[]
  series: EntityBasic
  notes: EntityBasic[]
}

type BookItemResponseExcluded = 'authors' | 'genres' | 'lists'
type BookPageResponseExcluded = BookItemResponseExcluded | 'publishers' | 'series' | 'notes'

export type BookItemResponse = Omit<BookDocument, BookItemResponseExcluded> & PopulatedBookItemModels
export type BookItemPaginated = PaginationModel<BookItemResponse> | undefined
export type BookPageResponse = Omit<BookDocument, BookPageResponseExcluded> & PopulatedBookPageModels
