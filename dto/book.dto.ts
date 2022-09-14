import { Types, _LeanDocument } from 'mongoose'
import { ListDocument, ListTree } from 'types/List'
import { IEntityBasic } from '../types/Common'
import { AuthorBookItem } from '../types/Category'
import { BookLinks, ReadingStatus, BookDocument, BookDocumentResponse } from '../types/Book'

export class BookItemDTO {
  _id: string
  isDraft: boolean
  title: string
  subtitle?: string
  authors: AuthorBookItem[]
  genres: IEntityBasic[]
  coverImage?: string
  publicationYear: number
  pages: number
  status: ReadingStatus
  lists: ListTree[]
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

  constructor(book: BookDocumentResponse) {
    this._id = book._id
    this.title = book.title
    this.authors = book.authors.map(({ author }) => author)
    this.coverImage = book.coverImage
    this.genres = book.genres
    this.isDraft = book.isDraft
    this.lists = this.#listTreeBuilder(book._id, book.lists)
    this.publicationYear = book.publicationYear
    this.status = book.status
    this.subtitle = book.subtitle
    this.pages = book.pages
    this.accountability = book.accountability ?? true
  }
}

export class BookPageDTO extends BookItemDTO {
  // @ts-ignore
  authors: AuthorBookPage[]
  contents?: string
  coverType: string
  description?: string
  file?: string
  format: string
  links?: BookLinks[]
  preCoverImage?: string
  // @ts-ignore
  publishers: PublisherBookPage[]
  rating?: number
  series?: any
  status: ReadingStatus
  summary?: string
  notes: any

  constructor(book: _LeanDocument<BookDocument & { _id: Types.ObjectId }>) {
    console.log(book)
    // @ts-ignore
    super(book)
    // @ts-ignore
    this.authors = book.authors
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
