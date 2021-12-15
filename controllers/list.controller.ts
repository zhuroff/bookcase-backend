import { Request, Response } from 'express'
import { getCategories } from '../shared/caterories-getters'
import List from '../models/list.model'

const listsCollections = async (req: Request, res: Response) => {
  try {
    const response = await getCategories(req, List)
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  listsCollections
}

export default controller
