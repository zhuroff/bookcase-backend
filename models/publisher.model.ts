import { model, Schema, PaginateModel } from 'mongoose'
import { CategoryModel, CategoryDocument } from '../types/Category'
import paginate from 'mongoose-paginate-v2'

const isRequired = (): boolean => (this as unknown as CategoryModel).isDraft

const PublisherSchema = new Schema({
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

PublisherSchema.plugin(paginate)
export const Publisher = model<CategoryDocument, PaginateModel<CategoryDocument>>('publishers', PublisherSchema)
