import { Document, Types } from 'mongoose'
import { EntityBasic } from './common'

export type NoteSource = {
  entity: string
  reference: Types.ObjectId
}

export type NoteDocument = Document & {
  isDraft: boolean
  title: string
  dateCreated: Date
  text: string
  references?: EntityBasic[]
  source?: NoteSource
  docModel?: string
}
