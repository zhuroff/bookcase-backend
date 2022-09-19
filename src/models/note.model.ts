// REFACTORED
import { model, Schema } from 'mongoose';
import { isRequiredField } from '../shared/functions';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { NoteDocument } from '../types/note'

const NoteSchema = new Schema<NoteDocument>({
  isDraft: {
    type: Boolean,
    required: true
  },

  title: {
    type: String,
    required: isRequiredField
  },

  dateCreated: {
    type: Schema.Types.Date,
    default: Date.now
  },

  text: {
    type: String,
    required: isRequiredField
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
NoteSchema.plugin(mongoosePagination)
export const Note = model<NoteDocument, Pagination<NoteDocument>>('notes', NoteSchema)
