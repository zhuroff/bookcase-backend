// REFACTORED
import { model, Schema } from 'mongoose'
import { CategoryDocument } from '../types/Category'
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

function isRequired(this: CategoryDocument): boolean { return this.isDraft }

const GenreSchema = new Schema<CategoryDocument>({
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

GenreSchema.index({ title: 'text' })
GenreSchema.plugin(mongoosePagination)
export const Genre = model<CategoryDocument, Pagination<CategoryDocument>>('genres', GenreSchema)
