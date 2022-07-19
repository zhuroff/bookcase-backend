import { ListModel, TListSection, TListSectionContent } from '../types/List'
import { BookModel } from '../types/Book'
import { BookItemDTO } from './book.dto'

export class ListContentItem {
  _id: string
  book: BookItemDTO
  comment: string | null

  constructor(content: TListSectionContent) {
    this._id = content._id
    this.book = new BookItemDTO(content.book as BookModel)
    this.comment = content.comment
  }
}

export class ListItemDTO {
  _id: string
  title: string
  isDraft: boolean
  books: number

  constructor(list: ListModel) {
    this._id = list._id
    this.title = list.title
    this.isDraft = list.isDraft
    this.books = list.lists.reduce((acc, { contents }) => acc + contents.length, 0)
  }
}

export class ListPageDTO {
  _id: string
  title: string
  isDraft: boolean
  lists: TListSection[]

  constructor(list: ListModel) {
    this._id = list._id
    this.title = list.title
    this.isDraft = list.isDraft
    // @ts-ignore
    this.lists = list.lists.map((list) => ({
      _id: list._id,
      title: list.title,
      content: list.contents.map((content) => new ListContentItem(content))
    }))
  }
}
