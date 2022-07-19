import { PaginateModel, Date, Document, Schema } from 'mongoose'
import { BookModel } from './Book'

export type TListSectionContent = {
  _id: string
  book: Schema.Types.ObjectId | BookModel
  comment: string | null
}

export type TListSection = {
  _id: string
  title: string
  contents: TListSectionContent[]
}

export interface ListModel extends Document {
  isDraft: boolean
  title: string
  lists: TListSection[]
  dateCreated?: Date
}

export interface IList<T extends Document> extends PaginateModel<T> { }