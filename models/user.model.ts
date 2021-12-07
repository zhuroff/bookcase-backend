import { model, Schema } from 'mongoose'
import { UserModel } from '../types/User'

const UserSchema = new Schema<UserModel>({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true,
    minLength: 10
  },

  name: {
    type: String,
    required: false
  },

  role: {
    type: String,
    required: true
  },

  dateCreated: {
    type: Date,
    default: Date.now
  }
})

export default model('user', UserSchema)
