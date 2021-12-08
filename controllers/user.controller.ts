import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import keys from '../keys'
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

const login = async (req: Request, res: Response) => {
  const attempt = await User.findOne({
    email: req.body.email
  })

  if (attempt) {
    const isPassValid = bcrypt.compareSync(req.body.password, attempt.password)

    if (isPassValid) {
      const token = jwt.sign({
        email: attempt.email,
        id: attempt._id
      }, keys.JWT, { expiresIn: 60 * 60 * 5 })

      res.json({ token })
    } else {
      res.status(404).json({ message: 'User not found!' })
    }
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}

const controller = {
  create,
  login
}

export default controller
