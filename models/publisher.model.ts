import { model, Schema } from 'mongoose'
import { CategoryModel, ICategory } from '../types/Category'
import mongoosePaginate from 'mongoose-paginate-v2'

const isRequired = (): boolean => (this as unknown as CategoryModel).isDraft

const PublisherSchema: Schema<CategoryModel> = new Schema({
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
PublisherSchema.plugin(mongoosePaginate)

export const Publisher = model<CategoryModel>('publishers', PublisherSchema) as ICategory<CategoryModel>
