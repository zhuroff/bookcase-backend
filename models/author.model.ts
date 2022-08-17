import { model, Schema } from 'mongoose'
import { AuthorModel, IAuthor } from '../types/Category'
import mongoosePaginate from 'mongoose-paginate-v2'

const isRequired = (): boolean => (this as unknown as AuthorModel).isDraft

const AuthorSchema: Schema<AuthorModel> = new Schema({
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

AuthorSchema.index({ firstName: 'text', lastName: 'text' })
AuthorSchema.plugin(mongoosePaginate)

export const Author = model<AuthorModel>('authors', AuthorSchema) as IAuthor<AuthorModel>
