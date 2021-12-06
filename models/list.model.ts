import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { BooksList } from '../types/List'

const isRequired = (): boolean => (this as unknown as BooksList).isDraft

const listSchema = new Schema({
  isDraft: {
    type: Boolean,
    required: true
  },

  heroImage: {
    type: String,
    //required: isRequired
    required: false
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

  lists: [
    {
      title: {
        type: String,
        required: false
      },

      contents: [
        {
          item: {
            type: Number,
            required: false
          },

          book: {
            type: Schema.Types.ObjectId,
            ref: 'book',
            required: false
          },

          comment: {
            type: String || null,
            required: false
          },

          required: false
        }
      ],

      required: false
    }
  ]
})

listSchema.plugin(mongoosePaginate)

export default model('list', listSchema)
