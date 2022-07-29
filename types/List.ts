import { ListContentItem } from 'dto/list.dto'
import { PaginateModel, Date, Document, PopulatedDoc } from 'mongoose'
import { BookModel } from './Book'

export type TListSectionContent = {
  _id: string
  book: PopulatedDoc<BookModel>
  comment: string | null
}

export type TListSection = {
  _id: string
  title: string
  contents: TListSectionContent[] | ListContentItem[]
}

export interface ListModel extends Document {
  isDraft: boolean
  title: string
  lists: TListSection[]
  dateCreated?: Date
}

export interface IList<T extends Document> extends PaginateModel<T> { }