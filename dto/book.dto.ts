import { AuthorBookPage, PublisherBookPage } from 'types/Category'
import { TListSection } from 'types/List'
import { BookModel, BookLinks, ReadingStatus } from '../types/Book'

export class BookItemDTO {
  _id: string
  title: string
  authors: any
  coverImage?: string
  genres: any
  isDraft: boolean
  lists: any
  publicationYear: number
  status: ReadingStatus
  subtitle?: string
  pages: number
  accountability?: boolean

  constructor(book: any) {
    this._id = book._id
    this.title = book.title
    // @ts-ignore
    this.authors = book.authors.map(({ author }) => author)
    this.coverImage = book.coverImage
    this.genres = book.genres
    this.isDraft = book.isDraft
    // @ts-ignore
    this.lists = !book.lists?.length ? [] : book.lists.map((list) => ({
      ...list,
      lists: list.lists.reduce((acc: any[], next: any) => {
        const matched = next.contents.filter((item: any) => (
          item.book.toString() === book._id.toString()
        ))

        if (matched.length) {
          acc.push({
            _id: next._id,
            title: next.title
          })
        }
        return acc
      }, [] as TListSection[])
    }))
    this.publicationYear = book.publicationYear
    this.status = book.status
    this.subtitle = book.subtitle
    this.pages = book.pages
    this.accountability = book.accountability ?? true
  }
}

export class BookPageDTO {
  authors: AuthorBookPage[]
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

  constructor(book: BookModel) {
    // super(book)
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
  }
}
