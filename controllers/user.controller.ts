import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
import User from '../models/user.model'

const create = async (req: Request, res: Response) => {
  const attempt = await User.findOne({ login: req.body.email })

  if (attempt) {
    res.status(409).json({ message: 'User with this email already exists' })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
      role: 'user'
    })

    await user.save()
    res.status(201).json(user)
  }
}

const controller = {
  create
}

export default controller
