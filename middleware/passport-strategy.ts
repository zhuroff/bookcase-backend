import { Document } from 'mongoose'
import { JWToken } from '../types/Token'
import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '../models/user.model'
import keys from '../keys'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT
}

const passportStrategy = new Strategy(
  options,
  async (payload: JWToken, done: (arg0: null, arg1: boolean | Document<any, any>) => void
) => {
  try {
    const attempt = await User.findById(payload.id).select('id')
    attempt ? done(null, attempt) : done(null, false)
  } catch (error) {
    console.error(error)
  }
})

export default passportStrategy
