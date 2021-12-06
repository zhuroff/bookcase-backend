import { Book } from './Book'

interface BooksSublistContent {
  _id?: string
  comment: string | null
  book: Book | string
  isDeleted?: boolean
}

interface BooksSublist {
  title: string
  _id?: string
  contents: BooksSublistContent[]
  isDeleted?: boolean
}

interface BooksList {
  dateCreated: Date
  heroImage: string
  isDraft: boolean
  title: string
  _id: string
  lists: BooksSublist[]
}

export { BooksSublistContent, BooksSublist, BooksList }
