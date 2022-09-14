import { model, Schema } from 'mongoose'
import { ListDocument } from '../types/List';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

const isRequired = (): boolean => (this as unknown as ListDocument).isDraft

const ListSchema: Schema<ListDocument> = new Schema({
  isDraft: {
    type: Boolean,
    required: true
  },

  title: {
    type: String,
    required: isRequired
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
ListSchema.plugin(mongoosePagination)
export const List = model<ListDocument, Pagination<ListDocument>>('lists', ListSchema)
