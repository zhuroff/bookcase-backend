import { Date } from 'mongoose'

interface CategoryBasic {
  isDraft: boolean
  title: string
  _id: string
  dateCreated: Date
  relatedBooks: string[]
}

interface CategoryAuthor extends CategoryBasic {
  firstName : string
  lastName: string
  patronymicName: string
}

export {
  CategoryBasic,
  CategoryAuthor
}