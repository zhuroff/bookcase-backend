import { Request, Response } from 'express'

const obj: { key: string, value: string } = {
  key: 'Hello',
  value: 'World'
}

const test = async (req: Request, res: Response) => {
  try {
    res.json(obj)
  } catch (error) {
    res.status(500).json({ message: 'Fucking error...' })
  }
}

const controller = {
  test
}

export default controller
