// REFACTORED
import { model, Schema } from 'mongoose'
import { AuthorDocument } from '../types/Category'
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

function isRequired(this: AuthorDocument): boolean { return this.isDraft }

const AuthorSchema = new Schema<AuthorDocument>({
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
    type: String,
    required: false
  },

  patronymicName: {
    type: String,
    required: false
  },

  links: [
    {
      title: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true,
      }
    }
  ],

  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'book'
    }
  ]
})

AuthorSchema.index({ firstName: 'text', lastName: 'text', patronymicName: 'text' })
AuthorSchema.plugin(mongoosePagination)
export const Author = model<AuthorDocument, Pagination<AuthorDocument>>('authors', AuthorSchema)
