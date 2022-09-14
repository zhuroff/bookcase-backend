// REFACTORED
import { model, Schema } from 'mongoose'
import { CategoryDocument } from '../types/Category'
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

function isRequired(this: CategoryDocument): boolean { return this.isDraft }

const SeriesSchema = new Schema<CategoryDocument>({
  isDraft: {
    type: Boolean,
    required: true
  },

  title: {
    type: String,
    required: isRequired
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

SeriesSchema.index({ title: 'text' })
SeriesSchema.plugin(mongoosePagination)
export const Series = model<CategoryDocument, Pagination<CategoryDocument>>('series', SeriesSchema)
