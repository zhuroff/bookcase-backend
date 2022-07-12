import { PaginateModel, Date, Document, Schema } from 'mongoose'

export interface ListSectionContent {
  item: number
  book: Schema.Types.ObjectId
  comment: string | null
}

export interface ListSection {
  title: string
  contents: ListSectionContent[]
}

export interface ListModel extends Document {
  isDraft: boolean
  title: string
  lists: ListSection[]
  dateCreated?: Date
}

export interface IList<T extends Document> extends PaginateModel<T> { }