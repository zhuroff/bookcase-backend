import { Types } from 'mongoose'
import { EntityLink } from '../types/Common'
import {
  CategoryDocument,
  AuthorDocument,
} from '../types/Category'

export class CategoryItemDTO {
  _id: string
  title: string
  booksCount: number
  isDraft: boolean

  constructor(category: CategoryDocument & { _id: Types.ObjectId }) {
    this._id = category._id
    this.title = category.title
    this.booksCount = category.books.length
    this.isDraft = category.isDraft
  }
}

export class CategoryPageDTO {
  _id: string
  title: string
  isDraft: boolean
  books: any //CategoryModelResponse['books']

  constructor(category: any /* CategoryModelResponse & { _id: Types.ObjectId } */) {
    this._id = String(category._id)
    this.title = category.title
    this.isDraft = category.isDraft
    this.books = category.books
  }
}

export class CategoryAuthorItemDTO {
  _id: string
  title: string
  booksCount: number
  isDraft: boolean
  firstName: string
  lastName?: string
  patronymicName?: string

  constructor(category: AuthorDocument & { _id: Types.ObjectId }) {
    this._id = String(category._id)
    this.booksCount = category.books.length
    this.isDraft = category.isDraft
    this.firstName = category.firstName
    this.lastName = category.lastName
    this.patronymicName = category.patronymicName
    this.title = this.#computedTitle(category)
  }

  #computedTitle(category: AuthorDocument & { _id: Types.ObjectId }) {
    const { firstName, lastName } = category
    if (lastName) {
      return `${lastName}, ${firstName}`
    }

    return firstName
  }
}

export class CategoryAuthorPageDTO {
  _id: string
  isDraft: boolean
  firstName: string
  lastName?: string
  patronymicName?: string
  books: any //CategoryModelResponse['books']
  links?: EntityLink[]

  constructor(category: any /* AuthorModelResponse & { _id: Types.ObjectId } */) {
    this._id = String(category._id)
    this.isDraft = category.isDraft
    this.firstName = category.firstName
    this.lastName = category.lastName
    this.patronymicName = category.patronymicName
    this.books = category.books
    this.links = category.links || []
  }
}
