import { Schema } from 'mongoose'
import { BookModel } from 'types/Book'
import { AuthorModel, CategoryModel } from "types/Category"
import { TEntityLink } from 'types/Common'
import { BookItemDTO } from '../dto/book.dto'

export class CategoryItemDTO {
  _id: string
  title: string
  books: number | BookItemDTO[]
  isDraft: boolean

  constructor(category: CategoryModel) {
    this._id = category._id
    this.title = category.title
    this.books = category.books.length
    this.isDraft = category.isDraft
  }
}

export class CategoryPageDTO extends CategoryItemDTO {
  books: BookItemDTO[]

  constructor(category: CategoryModel) {
    super(category)
    this.books = (category.books as BookModel[]).map((book) => new BookItemDTO(book))
  }
}

export class CategoryAuthorItemDTO extends CategoryItemDTO {
  firstName: string
  lastName?: string
  patronymicName?: string

  constructor(category: AuthorModel) {
    super(category)
    this.firstName = category.firstName
    this.lastName = category.lastName
    this.patronymicName = category.patronymicName
  }
}

export class CategoryAuthorPageDTO extends CategoryAuthorItemDTO {
  books: BookItemDTO[]
  links?: TEntityLink[]

  constructor(category: AuthorModel & { _id: Schema.Types.ObjectId }) {
    super(category)
    this.books = (category.books as BookModel[]).map((book) => new BookItemDTO(book))
    this.links = category.links || []
  }
}
