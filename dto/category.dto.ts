import { AuthorModel } from "types/Category"

export class CategoryItemDTO {
  _id: string
  title: string
  books: number
  isDraft: boolean

  constructor(category: AuthorModel) {
    this._id = category._id
    this.title = category.title
    this.books = category.books.length
    this.isDraft = category.isDraft
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
