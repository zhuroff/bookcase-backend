import { Date } from "mongoose"

interface User {
  email: string
  name: string
  role: string
  dateCreated: Date | undefined
}

interface UserModel extends User {
  password: string
}

export {
  User,
  UserModel
}
