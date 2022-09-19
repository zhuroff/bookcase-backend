// REFACTORED
import { Types } from 'mongoose'
import { UserDocument } from '../types/user'

export class UserDTO {
  id: Types.ObjectId
  email: string
  role: string
  firstName: string
  lastName: string

  constructor(model: UserDocument) {
    this.id = model._id
    this.email = model.email
    this.role = model.role
    this.firstName = model.firstName
    this.lastName = model.lastName
  }
}
