// REFACTORED
import { Document, Types } from 'mongoose'

export type SublistContent = Document & {
  item: number
  book: Types.ObjectId
  comment?: string | null
}

export type Sublist = Document & {
  title: string
  contents: SublistContent[]
}

export type ListDocument = Document & {
  isDraft: boolean
  title: string
  dateCreated: Date
  lists: Sublist[]
}

export type ListTree = Pick<ListDocument, 'title' | '_id'> & {
  lists?: ListTree[]
}
