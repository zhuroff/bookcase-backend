// REFACTORED
import { Types } from 'mongoose'
import { EntityBasic } from '../types/common'
import { ListDocument, ListTree } from '../types/list'
import { BookItemResponse, BookLinks, BookPageResponse, ReadingStatus } from '../types/book'
import { AuthorBookItem, AuthorBookPage, PublisherBookPage } from '../types/category'

class BookCommon<T extends BookItemResponse | BookPageResponse> {
  _id: string
  isDraft: boolean
  title: string
  subtitle?: string
  genres: EntityBasic[]
  lists: ListTree[]
  coverImage?: string
  publicationYear: number
  pages: number
  status: ReadingStatus
  accountability?: boolean

  #listTreeBuilder(bookID: Types.ObjectId, lists?: ListDocument[]) {
    if (!lists?.length) return []

    return lists.map((list) => ({
      ...list,
      lists: list.lists.reduce<ListTree[]>((acc, next) => {
        const matched = next.contents.filter((item) => (
          item.book.toString() === bookID.toString()
        ))

        if (matched.length) {
          acc.push({
            _id: next._id,
            title: next.title
          })
        }
        return acc
      }, [])
    }))
  }

  constructor(book: T) {
    this._id = book._id
    this.isDraft = book.isDraft
    this.title = book.title
    this.subtitle = book.subtitle
    this.genres = book.genres
    this.lists = this.#listTreeBuilder(book._id, book.lists)
    this.coverImage = book.coverImage
    this.publicationYear = book.publicationYear
    this.pages = book.pages
    this.status = book.status
    this.accountability = book.accountability ?? true
  }
}

export class BookItemDTO extends BookCommon<BookItemResponse> {
  authors: AuthorBookItem[]

  constructor(book: BookItemResponse) {
    super(book)
    this.authors = book.authors.map(({ author }) => author)
  }
}

export class BookPageDTO extends BookCommon<BookPageResponse> {
  authors: Array<Pick<AuthorBookPage, '_id' | 'role'> & { author: EntityBasic }>
  contents?: string
  coverType: string
  description?: string
  file?: string
  format: string
  links?: BookLinks[]
  preCoverImage?: string
  publishers: PublisherBookPage[]
  rating?: number
  series?: any
  status: ReadingStatus
  summary?: string
  notes: EntityBasic[]

  #authorMapper(authors: AuthorBookPage[]) {
    return authors.map(({ _id, role, author }) => ({
      role,
      _id,
      author: {
        _id: author._id,
        title: author.lastName ? `${author.lastName}, ${author.firstName}` : author.firstName
      }
    }))
  }

  constructor(book: BookPageResponse) {
    super(book)
    this.authors = this.#authorMapper(book.authors)
    this.contents = book.contents
    this.coverType = book.coverType
    this.description = book.description
    this.file = book.file
    this.format = book.format
    this.links = book.links
    this.preCoverImage = book.preCoverImage
    this.publishers = book.publishers
    this.rating = book.rating
    this.series = book.series
    this.status = book.status || { start: null, finish: null }
    this.summary = book.summary
    this.notes = book.notes || []
  }
}
