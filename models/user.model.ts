import { model, Schema } from 'mongoose'
import { UserModel } from '../types/User'

const UserSchema = new Schema<UserModel>({
  login: {
    type: String,
    unique: true,
    required: true
  },

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
    required: true
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
