// REFACTORED
import { Request, Response } from 'express'
import { UserResponse } from '../types/User'
import userService from '../services/user.service'

const cookieSetter = (res: Response, payload: UserResponse) => {
  res.cookie(
    'refreshToken',
    payload?.refreshToken,
    {
      maxAge: 30 * 24 + 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production'
    }
  )
}

class UserController {
  async registration(req: Request, res: Response) {
    try {
      const response = await userService.registration(req)
      cookieSetter(res, response)
      res.status(201).json(response)
    } catch (error) {
      res.status(400).json(error)
    }
  }

  async login(req: Request, res: Response) {
    try {
      const response = await userService.login(req)
      cookieSetter(res, response)
      res.status(200).json(response)
    } catch (error) {
      res.status(400).json(error)
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const response = await userService.refresh(req)
      cookieSetter(res, response)
      res.status(200).json(response)
    } catch (error) {
      res.status(400).json(error)
    }
  }
}

export default new UserController()
