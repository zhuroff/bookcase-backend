import { PaginateModel, Date, Document, PopulatedDoc } from 'mongoose'
import { BookModel } from './Book'
import { TEntityLink } from './Common'

export interface CategoryModel extends Document {
  isDraft: boolean
  title: string
  dateCreated?: Date
  books: PopulatedDoc<BookModel>[]
}

export interface AuthorModel extends Document {
  isDraft: boolean
  firstName: string
  lastName: string
  patronymicName: string
  books: PopulatedDoc<BookModel>[]
  dateCreated?: Date
  title: string
  links: TEntityLink[]
}

export interface ICategory<T extends Document> extends PaginateModel<T> { }

export interface IAuthor<T extends Document> extends PaginateModel<T> { }

export type AuthorBookPage = Document & {
  author: PopulatedDoc<AuthorModel>
  role: string
}

export type PublisherBookPage = {
  publisher: PopulatedDoc<CategoryModel>
  city?: string
  code?: string
}

export type CategoryBasic = {
  _id: string
  title: string
}
