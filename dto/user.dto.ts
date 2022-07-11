import { Types } from 'mongoose'
import { UserModel } from '../types/User'

export class UserDTO {
  email: string
  id: Types.ObjectId
  role: string
  firstName: string
  lastName: string

  constructor(model: UserModel & { _id: Types.ObjectId }) {
    this.email = model.email
    this.id = model._id
    this.role = model.role
    this.firstName = model.firstName
    this.lastName = model.lastName
  }
}
