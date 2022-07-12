import { model, Schema } from 'mongoose'
import { CategoryModel, ICategory } from '../types/Category'
import mongoosePaginate from 'mongoose-paginate-v2'

const isRequired = (): boolean => (this as unknown as CategoryModel).isDraft

const SeriesSchema: Schema<CategoryModel> = new Schema({
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

  picture: {
    type: String,
    required: false
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
SeriesSchema.plugin(mongoosePaginate)

export const Series = model<CategoryModel>('series', SeriesSchema) as ICategory<CategoryModel>
