import { model, Schema, PaginateModel } from 'mongoose'
import { AuthorModel, AuthorDocument } from '../types/Category'
import paginate from 'mongoose-paginate-v2'

const isRequired = (): boolean => (this as unknown as AuthorModel).isDraft

const AuthorSchema = new Schema({
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
    index: true,
    required: isRequired
  },

  lastName: {
    type: String,
    index: true
  },

  patronymicName: {
    type: String
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

AuthorSchema.plugin(paginate)
export const Author = model<AuthorDocument, PaginateModel<AuthorDocument>>('authors', AuthorSchema)
