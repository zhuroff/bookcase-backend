import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { Book } from '../types/Book'

const isRequired = (): boolean => (this as unknown as Book).isDraft

const bookSchema = new Schema({
  isDraft: {
    type: Boolean,
    required: true
  },

  article: {
    type: String,
    required: false
  },

  relatedAuthors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'author',
      required: true
    }
  ],

  authorsRole: [
    {
      authorID: {
        type: String,
        required: true
      },

      authorRole: {
        type: String,
        required: true
      }
    }
  ],

  bookFormat: {
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

  coverType: {
    type: String,
    required: isRequired
  },

  dateCreated: {
    type: Date,
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

  relatedGenres: [
    {
      type: Schema.Types.ObjectId,
      ref: 'genre',
      required: true
    }
  ],

  output: {
    cities: [
      {
        type: String,
        required: false
      }
    ],

    codes: [
      {
        type: String,
        required: false
      }
    ],

    pages: {
      type: Number,
      required: isRequired
    },

    year: {
      type: Number,
      required: isRequired
    }
  },

  relatedPublishers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'publisher',
      required: true
    }
  ],

  rating: {
    type: Number,
    required: false
  },

  readingStatus: {
    startReading: {
      type: Date,
      required: false
    },

    finishReading: {
      type: Date,
      required: false
    },

    readingProcess: {
      type: String,
      required: false
    },

    required: false
  },

  relatedSeries: {
    type: Schema.Types.ObjectId,
    ref: 'series',
    required: false
  },

  inList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'list',
      required: false
    }
  ],

  title: {
    type: String,
    required: isRequired,
    index: true
  },

  subtitle: {
    type: String,
    required: false,
    index: true
  }
})

bookSchema.plugin(mongoosePaginate)

export default model('book', bookSchema)