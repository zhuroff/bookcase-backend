import { model, Schema } from 'mongoose'
import { CategoryModel, ICategory } from '../types/Category'
import mongoosePaginate from 'mongoose-paginate-v2'

const isRequired = (): boolean => (this as unknown as CategoryModel).isDraft

const GenreSchema: Schema<CategoryModel> = new Schema({
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

GenreSchema.index({ title: 'text' })
GenreSchema.plugin(mongoosePaginate)

export const Genre = model<CategoryModel>('genres', GenreSchema) as ICategory<CategoryModel>
