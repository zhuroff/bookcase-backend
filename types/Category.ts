import { Date, Document, Types } from 'mongoose'
import { BookItemDTO } from '../dto/book.dto'
// import { PaginationDTO } from '../dto/pagination.dto'
import { IEntityBasic, TEntityLink } from './Common'

export interface CategoryModel {
  isDraft: boolean
  title: string
  dateCreated: Date
  books: Types.ObjectId[]
}

export interface CategoryModelResponse extends Omit<CategoryModel, 'books'> {
  books: {
    docs: BookItemDTO[]
    // pagination: any //PaginationDTO<any>
  }
}

export interface CategoryModelPayload extends Pick<CategoryModel, 'isDraft' | 'title'> {
  isDeleted?: boolean
  isAdded?: boolean
  isChanged?: boolean
}

export interface AuthorModel extends Exclude<CategoryModel, 'title'> {
  firstName: string
  lastName: string
  patronymicName: string
  books: Types.ObjectId[]
  links: TEntityLink[]
}

export interface AuthorModelResponse extends Omit<AuthorModel, 'books'> {
  books: {
    docs: BookItemDTO[]
    // pagination: any//PaginationDTO<any>
  }
}

export interface AuthorModelInBook {
  author: IEntityBasic
  role: string
}

export interface AuthorBookItem {
  _id: string
  title: string
  firstName: string
  lastName: string
  patronymicName: string
}

export interface CategoryDocument extends Document, CategoryModel { }
export interface AuthorDocument extends Document, AuthorModel { }













// export type AuthorBookPage = Document & {
//   author: PopulatedDoc<AuthorModel>
//   role: string
//   isDeleted?: boolean
//   isAdded?: boolean
//   isChanged?: boolean
// }

// export type AuthorBookPagePayload = {
//   role: string
//   author: Types.ObjectId
// }

// export type PublisherBookPage = {
//   publisher: PopulatedDoc<CategoryModel>
//   city?: string
//   code?: string
//   isDeleted?: boolean
//   isAdded?: boolean
//   isChanged?: boolean
// }

// export type PublisherBookPagePayload = {
//   publisher: Types.ObjectId
//   city?: string
//   code?: string
// }

// export type CategoryBasic = {
//   _id: string
//   title: string
// }
