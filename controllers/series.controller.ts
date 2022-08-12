import { Request, Response } from 'express'
import { Series } from '../models/series.model'
import { CategoryModel } from '../types/Category'
import { CategoryItemDTO, CategoryPageDTO } from '../dto/category.dto'
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

  async page(req: Request, res: Response) {
    try {
      const response = await categoryService.page<CategoryModel>(req, Series)

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
      const response = await categoryService.update<CategoryModel>(req, Series)
      return res.status(201).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }
}

export default new SeriesController()
