import { Request, Response } from 'express'
import listService from '../services/list.service'
import { ListItemDTO } from '../dto/list.dto'

class ListController {
  async list(req: Request, res: Response) {
    try {
      const response = await listService.list(req)

      res.status(200).json({
        ...response,
        docs: response.docs.map((doc) => new ListItemDTO(doc))
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async page(req: Request, res: Response) {
    try {
      const response = await listService.page(req)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }
}

export default new ListController()
