import { Request, Response } from 'express'
import { Publisher } from '../models/publisher.model'
import { CategoryModel } from '../types/Category'
import { CategoryItemDTO } from '../dto/category.dto'
import categoryService from '../services/category.service'

class PublisherController {
  async list(req: Request, res: Response) {
    try {
      const response = await categoryService.list<CategoryModel>(req, Publisher)

      res.status(200).json({
        ...response,
        docs: response.docs.map((doc) => new CategoryItemDTO(doc))
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

// const create = async (req: Request, res: Response) => {
//   const payload = {
//     isDraft: req.body.isDraft,
//     title: req.body.title,
//     books: []
//   }

//   const publisher = new Publisher(payload)

//   try {
//     await publisher.save()
//     res.status(201).json(publisher)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }

export default new PublisherController()
