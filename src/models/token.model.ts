// REFACTORED
import { model, Schema } from 'mongoose'
import { AuthToken } from '../types/token'

const TokenSchema = new Schema<AuthToken>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  refreshToken: {
    type: String,
    required: true
  }
})

export const Token = model<AuthToken>('tokens', TokenSchema)
