import { model, Schema } from 'mongoose'

const geoscaleSchema = new Schema({
  id: {
    type: Number,
    required: true
  },

  title: {
    type: String,
    required: true,
    index: true
  },

  type: {
    type: String,
    required: true
  },

  level: {
    type: Number,
    required: false
  },

  inner: [
    
  ]
})

export default model('geoscale', geoscaleSchema)
