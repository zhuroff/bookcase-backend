import { model, Schema, PaginateModel } from 'mongoose'
import { NoteModel, NoteDocument } from '../types/Note'
import paginate from 'mongoose-paginate-v2'

const NoteSchema: Schema<NoteModel> = new Schema({
  title: {
    type: String,
    required: true
  },

  dateCreated: {
    type: Schema.Types.Date,
    default: Date.now
  },

  text: {
    type: String,
    required: true
  },

  references: [
    {
      type: Schema.Types.ObjectId,
      ref: 'notes'
    }
  ],

  source: {
    entity: {
      type: String,
      required: true
    },

    reference: {
      type: Schema.Types.ObjectId,
      refPath: 'docModel'
    }
  },

  docModel: {
    type: String,
    enum: ['books', 'videos', 'articles', 'podcasts']
  }
})

NoteSchema.index({ title: 'text', dateCreated: 'text', text: 'text' })
NoteSchema.plugin(paginate)
export const Note = model<NoteDocument, PaginateModel<NoteDocument>>('notes', NoteSchema)
