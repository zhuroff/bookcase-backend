import { Date, Document, Types } from 'mongoose'
import { EntityBasic, EntityLink } from './Common'
import { BookItemFinalResponse } from './Book'

export type CategoryDocument = Document & {
  isDraft: boolean
  title: string
  dateCreated: Date
  books: Types.ObjectId[]
}

export type AuthorDocument = Omit<CategoryDocument, 'title'> & {
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

export type AuthorItemResponse = AuthorBookItem & Pick<CategoryDocument, 'isDraft' | 'books'>
export type AuthorPageResponse = AuthorBookItem & Pick<AuthorDocument, 'isDraft' | 'links'> & { books: BookItemFinalResponse }
export type CategoryItemResponse = Omit<CategoryDocument, 'dateCreated'>
export type CategoryPageResponse = Omit<CategoryDocument, 'dateCreated' | 'books'> & { books: BookItemFinalResponse }

// Can be useful for CRUD operations
// export type CategoryModelPayload = Pick<CategoryDocument, 'isDraft' | 'title'> & {
//   isDeleted?: boolean
//   isAdded?: boolean
//   isChanged?: boolean
// }
