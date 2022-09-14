import { Document, Types } from 'mongoose'
import { IEntityBasic } from './Common'

export interface NoteSource {
  entity: string
  reference: Types.ObjectId
}

export interface NoteModel extends Document {
  title: string
  dateCreated: Date
  text: string
  references?: IEntityBasic[]
  source?: NoteSource
  docModel?: string
}

export interface NoteDocument extends Document, NoteModel { }
