import { Document, Types } from 'mongoose'
import { EntityBasic } from './Common'

export interface NoteSource {
  entity: string
  reference: Types.ObjectId
}

export interface NoteDocument extends Document {
  isDraft: boolean
  title: string
  dateCreated: Date
  text: string
  references?: EntityBasic[]
  source?: NoteSource
  docModel?: string
}
