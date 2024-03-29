// REFACTORED
import { model, Schema } from 'mongoose'
import { isRequiredField } from '../shared/functions'
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { BookDocument } from '../types/book';

const BookSchema = new Schema<BookDocument>({
  isDraft: {
    type: Boolean,
    required: true
  },

  title: {
    type: String,
    required: isRequiredField
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
    required: isRequiredField
  },

  contents: {
    type: String,
    required: isRequiredField
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
    required: isRequiredField
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
    required: isRequiredField
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
    required: isRequiredField
  },

  pages: {
    type: Number,
    required: isRequiredField
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
