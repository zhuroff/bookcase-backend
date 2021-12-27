import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const publisherSchema = new Schema({
  isDraft: {
    type: Boolean,
    required: true
  },

  title: {
    type: String,
    required: true,
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

publisherSchema.index({ title: 'text' })
publisherSchema.plugin(mongoosePaginate)

export default model('publisher', publisherSchema)
