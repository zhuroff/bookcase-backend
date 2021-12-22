import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const seriesSchema = new Schema({
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

seriesSchema.plugin(mongoosePaginate)

export default model('series', seriesSchema)
