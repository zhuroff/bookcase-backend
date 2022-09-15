// REFACTORED
import { model, Schema } from 'mongoose'
import { CategoryDocument } from '../types/Category'
import { isRequiredField } from '../shared/functions';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

const PublisherSchema = new Schema<CategoryDocument>({
  isDraft: {
    type: Boolean,
    required: true
  },

  title: {
    type: String,
    required: isRequiredField,
    index: true
  },

  dateCreated: {
    type: Date,
    default: Date.now
  },

  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'book',
      required: false
    }
  ]
})

PublisherSchema.index({ title: 'text' })
PublisherSchema.plugin(mongoosePagination)
export const Publisher = model<CategoryDocument, Pagination<CategoryDocument>>('publishers', PublisherSchema)
