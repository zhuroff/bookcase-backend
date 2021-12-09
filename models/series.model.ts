import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const seriesSchema = new Schema({
  isDraft: {
    type: Boolean,
    required: true
  },

  id: {
    type: Number,
    required: false
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

  books: {
    type: Array,
    required: false
  },

  picture: {
    type: String,
    required: false
  },

  relatedBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'book',
      required: false
    }
  ]
})

seriesSchema.plugin(mongoosePaginate)

export default model('series', seriesSchema)
