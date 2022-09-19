import { ListDocument, Sublist } from '../types/list'
import { BookItemDTO } from './book.dto'

export class ListContentItem {
  _id?: string
  book: BookItemDTO
  comment: string | null

  constructor(content: any) {
    this._id = content._id
    // @ts-ignore
    this.book = new BookItemDTO(content.book as BookDocument)
    this.comment = content.comment
  }
}

export class ListItemDTO {
  _id: string
  title: string
  isDraft: boolean
  books: number

  constructor(list: ListDocument) {
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
  lists: Sublist[]

  constructor(list: ListDocument) {
    this._id = list._id
    this.title = list.title
    this.isDraft = list.isDraft
    this.lists = list.lists
    // this.lists = list.lists.map((list) => ({
    //   _id: list._id,
    //   title: list.title,
    //   contents: (list.contents as TListSectionContent[]).reduce((acc, next) => {
    //     if (next.book) {
    //       acc.push(new ListContentItem(next))
    //     }
    //     return acc
    //   }, [] as ListContentItem[])
    // }))
  }
}
