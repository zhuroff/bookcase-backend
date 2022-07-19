import { Request, Response } from 'express'
import { Publisher } from '../models/publisher.model'
import { CategoryModel } from '../types/Category'
import { CategoryItemDTO, CategoryPageDTO } from '../dto/category.dto'
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

  async page(req: Request, res: Response) {
    try {
      const response = await categoryService.page<CategoryModel>(req, Publisher)

      if (response) {
        // @ts-ignore
        res.status(200).json(new CategoryPageDTO(response))
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const response = await categoryService.update<CategoryModel>(req, Publisher)
      return res.status(201).json(response)
    } catch (error) {
      console.log(error)
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
