import { model, Schema, PaginateModel } from 'mongoose'
import { CategoryModel, CategoryDocument } from '../types/Category'
import paginate from 'mongoose-paginate-v2'

const isRequired = (): boolean => (this as unknown as CategoryModel).isDraft

const SeriesSchema = new Schema({
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

SeriesSchema.plugin(paginate)
export const Series = model<CategoryDocument, PaginateModel<CategoryDocument>>('series', SeriesSchema)
