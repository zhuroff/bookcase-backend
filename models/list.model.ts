// REFACTORED
import { model, Schema } from 'mongoose'
import { ListDocument } from '../types/List';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

function isRequired(this: ListDocument): boolean { return this.isDraft }

const ListSchema = new Schema<ListDocument>({
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
