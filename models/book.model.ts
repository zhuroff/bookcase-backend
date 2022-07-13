import { model, Schema } from 'mongoose'
import { BookModel, IBook } from '../types/Book'
import mongoosePaginate from 'mongoose-paginate-v2'

const isRequired = (): boolean => (this as unknown as BookModel).isDraft

const BookSchema: Schema<BookModel> = new Schema({
  isDraft: {
    type: Boolean,
    required: true
  },

  title: {
    type: String,
    required: isRequired,
    index: true
  },

  accountability: {
    type: Boolean,
    required: false,
    default: true
  },

  subtitle: {
    type: String,
    required: false,
    index: true
  },

  summary: {
    type: String,
    required: false
  },

  authors: [
    {
      author: {
        type: Schema.Types.ObjectId,
        ref: 'authors',
        required: true
      },

      role: {
        type: String,
        required: true
      }
    }
  ],

  genres: [
    {
      type: Schema.Types.ObjectId,
      ref: 'genres',
      required: true
    }
  ],

  series: {
    type: Schema.Types.ObjectId,
    ref: 'series',
    required: false
  },

  publishers: [
    {
      publisher: {
        type: Schema.Types.ObjectId,
        ref: 'publishers',
        required: true
      },

      city: {
        type: String,
        required: false
      },

      code: {
        type: String,
        required: false
      }
    }
  ],

  format: {
    type: String,
    required: isRequired
  },

  contents: {
    type: String,
    required: isRequired
  },

  coverImage: {
    type: String,
    required: isRequired
  },

  preCoverImage: {
    type: String,
    default: ''
  },

  coverType: {
    type: String,
    required: isRequired
  },

  dateCreated: {
    type: Schema.Types.Date,
    default: Date.now
  },

  dateModified: {
    type: Schema.Types.Date,
    default: Date.now
  },

  description: {
    type: String,
    required: isRequired
  },

  file: {
    type: String,
    required: false
  },

  links: [
    {
      url: {
        type: String,
        required: true
      },

      title: {
        type: String,
        required: false
      },

      required: false
    }
  ],

  publicationYear: {
    type: Number,
    required: isRequired
  },

  pages: {
    type: Number,
    required: isRequired
  },

  rating: {
    type: Number,
    required: false
  },

  status: {
    start: {
      type: Date,
      required: false
    },

    finish: {
      type: Date,
      required: false
    },

    required: false
  },

  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'lists',
      required: false
    }
  ]
})

BookSchema.index({ title: 'text', subtitle: 'text' })
BookSchema.plugin(mongoosePaginate)

export const Book = model<BookModel>('books', BookSchema) as IBook<BookModel>
