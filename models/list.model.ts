import { model, Schema } from 'mongoose'
import { ListModel, IList } from '../types/List'
import mongoosePaginate from 'mongoose-paginate-v2'

const isRequired = (): boolean => (this as unknown as ListModel).isDraft

const ListSchema: Schema<ListModel> = new Schema({
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

ListSchema.index({ title: 'text' })
ListSchema.plugin(mongoosePaginate)

export const List = model<ListModel>('lists', ListSchema) as IList<ListModel>
