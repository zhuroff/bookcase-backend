import { PaginateModel, Date, Document, Schema } from 'mongoose'
import { BookModel } from './Book'
import { TEntityLink } from './Common'

export type CategoryBasic = {
  _id: string
  title: string
}

export interface AuthorModel extends Document {
  isDraft: boolean
  firstName: string
  lastName: string
  patronymicName: string
  books: Schema.Types.ObjectId[] | BookModel[]
  dateCreated?: Date
  title: string
  links: TEntityLink[]
}

export interface CategoryModel extends Document {
  isDraft: boolean
  title: string
  dateCreated?: Date
  books: Schema.Types.ObjectId[] | BookModel[]
  picture?: string
}

export interface IAuthor<T extends Document> extends PaginateModel<T> { }

export interface ICategory<T extends Document> extends PaginateModel<T> { }

export type CategoryExtended = CategoryBasic & {
  books: string[]
  picture?: string
}

export type CategoryAuthor = CategoryBasic & {
  firstName: string
  lastName: string
  patronymicName: string
}

export type CategoryAuthorExtended = {
  author: CategoryAuthor
  role: string
  _id: string
}
