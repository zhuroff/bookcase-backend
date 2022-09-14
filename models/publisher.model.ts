// REFACTORED
import { model, Schema } from 'mongoose'
import { CategoryDocument } from '../types/Category'
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

function isRequired(this: CategoryDocument): boolean { return this.isDraft }

const PublisherSchema = new Schema<CategoryDocument>({
  isDraft: {
    type: Boolean,
    required: true
  },

  title: {
    type: String,
    required: isRequired,
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
