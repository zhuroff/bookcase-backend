import { Request, Response } from 'express'
import { Series } from '../models/series.model'
import { CategoryModel } from '../types/Category'
import { CategoryItemDTO } from '../dto/category.dto'
import categoryService from '../services/category.service'

class SeriesController {
  async list(req: Request, res: Response) {
    try {
      const response = await categoryService.list<CategoryModel>(req, Series)

      res.status(200).json({
        ...response,
        docs: response.docs.map((doc) => new CategoryItemDTO(doc))
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default new SeriesController()

// const create = async (req: Request, res: Response) => {
//   const payload = {
//     isDraft: req.body.isDraft,
//     title: req.body.title,
//     books: []
//   }

//   const series = new Series(payload)

//   try {
//     await series.save()
//     res.status(201).json(series)
//   } catch(error) {
//     res.status(500).json(error)
//   }
// }
