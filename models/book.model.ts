import { model, Schema } from 'mongoose'
import { BookDocument } from '../types/Book'
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

const isRequired = (): boolean => (this as unknown as BookDocument).isDraft

const BookSchema: Schema<BookDocument> = new Schema({
  isDraft: {
    type: Boolean,
    required: true
  },

  title: {
    type: String,
    required: isRequired
  },

  subtitle: {
    type: String,
    required: false
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

  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'notes'
    }
  ],

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
    required: false
  },

  preCoverImage: {
    type: String,
    required: false,
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
  ],

  accountability: {
    type: Boolean,
    required: false,
    default: true
  },
})

BookSchema.index({ title: 'text', subtitle: 'text' })
BookSchema.plugin(mongoosePagination)
export const Book = model<BookDocument, Pagination<BookDocument>>('books', BookSchema)
