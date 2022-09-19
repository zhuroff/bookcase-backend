import jwt from 'jsonwebtoken'
import { Token } from '../models/token.model'

const validateRefreshToken = (token: string) => {
  try {
    const userData = jwt.verify(token, process.env['JWT_REFRESH_TOKEN'] as string)
    return userData as jwt.JwtPayload
  } catch (ignore) {
    return null
  }
}

export const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
      throw { message: 'Unauthorized' }
    }

    const verifiedUser = validateRefreshToken(refreshToken)
    const dbToken = await Token.findOne({ refreshToken })

    if (!verifiedUser || !dbToken) {
      throw { message: 'Unauthorized' }
    }

    const decoded = jwt.verify(refreshToken, process.env['JWT_REFRESH_TOKEN'] as string)

    if (!decoded) {
      throw { message: 'Unauthorized' }
    }

    next()
  } catch (error) {
    res.status(401).json(error)
  }
}
