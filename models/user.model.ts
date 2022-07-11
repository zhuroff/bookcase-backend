import { model, Schema } from 'mongoose'
import { UserModel } from '../types/User'

const UserSchema = new Schema<UserModel>({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  firstName: {
    type: String,
    required: false
  },

  lastName: {
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

export const User = model<UserModel>('user', UserSchema)
