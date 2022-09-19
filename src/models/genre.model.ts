// REFACTORED
import { model, Schema } from 'mongoose';
import { isRequiredField } from '../shared/functions';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { CategoryDocument } from '../types/category';

const GenreSchema = new Schema<CategoryDocument>({
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

GenreSchema.index({ title: 'text' })
GenreSchema.plugin(mongoosePagination)
export const Genre = model<CategoryDocument, Pagination<CategoryDocument>>('genres', GenreSchema)
