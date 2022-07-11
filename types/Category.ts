import { PaginateModel, Date, Document, Schema } from "mongoose"

export type CategoryBasic = {
  _id: string
  title: string
}

export interface AuthorModel extends Document {
  isDraft: boolean
  firstName: string
  lastName: string
  patronymicName: string
  books: Schema.Types.ObjectId[]
  dateCreated?: Date
  title: string
}

export interface IAuthor<T extends Document> extends PaginateModel<T> { }

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
