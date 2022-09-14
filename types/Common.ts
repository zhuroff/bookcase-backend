export interface IEntityBasic {
  _id: string
  title: string
}

export type ISort = {
  [index: string]: 1 | -1
}

export type IFilter = {
  [index: string]: any
}

export type TEntityLink = {
  title: string
  url: string
}
