import { Request, Response } from 'express'
import { Genre } from '../models/genre.model'
import { CategoryModel } from '../types/Category'
import { CategoryItemDTO } from '../dto/category.dto'
import categoryService from '../services/category.service'

class GenreController {
  async list(req: Request, res: Response) {
    try {
      const response = await categoryService.list<CategoryModel>(req, Genre)

      res.status(200).json({
        ...response,
        docs: response.docs.map((doc) => new CategoryItemDTO(doc))
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default new GenreController()
