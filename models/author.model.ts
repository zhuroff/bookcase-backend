import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { CategoryAuthor } from '../types/Category'

const isRequired = (): boolean => (this as unknown as CategoryAuthor).isDraft

const authorSchema = new Schema({
  isDraft: {
    type: Boolean,
    required: true
  },

  dateCreated: {
    type: Date,
    default: Date.now
  },

  firstName: {
    type: String,
    required: isRequired
  },

  lastName: {
    type: String || null,
    required: false
  },

  patronymicName: {
    type: String || null,
    required: false
  },

  title: {
    type: String,
    required: isRequired,
    index: true
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

authorSchema.plugin(mongoosePaginate)

export default model('author', authorSchema)
