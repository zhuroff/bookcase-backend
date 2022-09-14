import { Date, Document, Types } from 'mongoose'
import { EntityBasic, EntityLink } from './Common'

export type CategoryDocument = Document & {
  isDraft: boolean
  title: string
  dateCreated: Date
  books: Types.ObjectId[]
}

export type AuthorDocument = Exclude<CategoryDocument, 'title'> & {
  firstName: string
  lastName: string
  patronymicName: string
  books: Types.ObjectId[]
  links: EntityLink[]
}

export type AuthorBookItem = Document & {
  firstName: string
  lastName: string
  patronymicName: string
}

export type AuthorBookPage = Document & {
  role: string
  author: AuthorBookItem
}

export type PublisherBookPage = Document & {
  publisher: EntityBasic
  city: string
  code: string
}

// Can be useful for CRUD operations
// export type CategoryModelPayload = Pick<CategoryDocument, 'isDraft' | 'title'> & {
//   isDeleted?: boolean
//   isAdded?: boolean
//   isChanged?: boolean
// }
