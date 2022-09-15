// REFACTORED
import { model, Schema } from 'mongoose';
import { CategoryDocument } from '../types/Category';
import { isRequiredField } from '../shared/functions';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

const SeriesSchema = new Schema<CategoryDocument>({
  isDraft: {
    type: Boolean,
    required: true
  },

  title: {
    type: String,
    required: isRequiredField
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
