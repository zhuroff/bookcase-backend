import { Date, Document } from 'mongoose'
import { UserDTO } from '../dto/user.dto'

export type UserDocument = Document & {
  password: string
  email: string
  firstName: string
  lastName: string
  role: string
  dateCreated: Date | undefined
}

export type UserResponse = {
  user: UserDTO;
  accessToken: string;
  refreshToken: string;
}
