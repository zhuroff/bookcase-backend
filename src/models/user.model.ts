// REFACTORED
import { model, Schema } from 'mongoose'
import { UserDocument } from '../types/user'

const UserSchema = new Schema<UserDocument>({
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

export const User = model<UserDocument>('user', UserSchema)
