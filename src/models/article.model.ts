// REFACTORED
import { model, Schema } from 'mongoose'
import { isRequiredField } from '../shared/functions'
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { ArticleDocument } from '../types/article'

const ArticleSchema = new Schema<ArticleDocument>({
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

  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'notes'
    }
  ],

  dateCreated: {
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

  reference: {
    link: {
      type: String,
      required: false
    },

    text: {
      type: String,
      required: false
    }
  },

  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'lists',
      required: false
    }
  ]
})

ArticleSchema.index({ title: 'text', subtitle: 'text' })
ArticleSchema.plugin(mongoosePagination)
export const Article = model<ArticleDocument, Pagination<ArticleDocument>>('articles', ArticleSchema)
