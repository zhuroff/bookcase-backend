// REFACTORED
export type EntityBasic = {
  _id: string
  title: string
}

export type QuerySort = {
  [index: string]: 1 | -1
}

export type QueryFilter = {
  [index: string]: any
}

export type EntityLink = {
  title: string
  url: string
}
