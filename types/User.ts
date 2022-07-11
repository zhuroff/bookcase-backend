import { UserDTO } from 'dto/user.dto'
import { Date } from 'mongoose'

type UserModel = {
  password: string
  email: string
  firstName: string
  lastName: string
  role: string
  dateCreated: Date | undefined
}

type UserResponse = {
  user: UserDTO;
  accessToken: string;
  refreshToken: string;
}

export {
  UserModel,
  UserResponse
}
