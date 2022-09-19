// REFACTORED
import { LeanDocument } from 'mongoose'
import { BookItemFinalResponse } from '../types/book'
import { EntityLink } from '../types/common'
import { AuthorItemResponse, AuthorPageResponse, CategoryItemResponse, CategoryPageResponse } from '../types/category'

type ExtendibleCategories =
  CategoryItemResponse |
  LeanDocument<CategoryPageResponse> |
  AuthorItemResponse |
  LeanDocument<AuthorPageResponse>

class CategoryCommon<T extends ExtendibleCategories> {
  _id: string
  isDraft: boolean

  constructor(category: T) {
    this._id = category._id
    this.isDraft = category.isDraft
  }
}

export class CategoryItemDTO extends CategoryCommon<CategoryItemResponse> {
  title: string
  booksCount: number

  constructor(category: CategoryItemResponse) {
    super(category)
    this.title = category.title
    this.booksCount = category.books.length
  }
}

export class CategoryPageDTO extends CategoryCommon<LeanDocument<CategoryPageResponse>> {
  title: string
  books: BookItemFinalResponse

  constructor(category: LeanDocument<CategoryPageResponse>, books: BookItemFinalResponse) {
    super(category)
    this.title = category.title
    this.books = books
  }
}

export class CategoryAuthorItemDTO extends CategoryCommon<AuthorItemResponse> {
  firstName: string
  lastName?: string
  patronymicName?: string
  booksCount: number

  constructor(category: AuthorItemResponse) {
    super(category)
    this.firstName = category.firstName
    this.lastName = category.lastName
    this.patronymicName = category.patronymicName
    this.booksCount = category.books.length
  }
}

export class CategoryAuthorPageDTO extends CategoryCommon<LeanDocument<AuthorPageResponse>> {
  firstName: string
  lastName?: string
  patronymicName?: string
  books: BookItemFinalResponse
  links?: EntityLink[]

  constructor(category: LeanDocument<AuthorPageResponse>, books: BookItemFinalResponse) {
    super(category)
    this.firstName = category.firstName
    this.lastName = category.lastName
    this.patronymicName = category.patronymicName
    this.books = books
    this.links = category.links || []
  }
}
