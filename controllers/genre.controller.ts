import { Request, Response } from 'express'
import { Genre } from '../models/genre.model'
import { CategoryModel } from '../types/Category'
import { CategoryItemDTO, CategoryPageDTO } from '../dto/category.dto'
import categoryService from '../services/category.service'

class GenreController {
  async create(req: Request, res: Response) {
    try {
      const response = await categoryService.create<CategoryModel>(req, Genre)
      res.status(201).json(new CategoryItemDTO(response as CategoryModel))
    } catch (error) {
      res.status(500).json(error)
    }
  }

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

  async page(req: Request, res: Response) {
    try {
      const response = await categoryService.page<CategoryModel>(req, Genre)

      if (response) {
        // @ts-ignore
        res.status(200).json(new CategoryPageDTO(response))
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const requiredFields = Object.entries(Genre.schema.paths).reduce<string[]>((acc, [key, { validators }]) => {
        if (validators.length && key !== 'isDraft') {
          acc.push(key)
        }
        return acc
      }, [])
      const response = await categoryService.update<CategoryModel>(req, Genre, requiredFields)
      return res.status(201).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const response = await categoryService.remove<CategoryModel>(String(req.params['id']), Genre)
      return res.status(201).json(response)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default new GenreController()
