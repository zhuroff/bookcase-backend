import { Request, Response } from 'express'
import { Types } from 'mongoose'
import { Genre } from '../models/genre.model'
import { CategoryItemDTO, CategoryPageDTO } from '../dto/category.dto'
import { CategoryDocument, CategoryItemResponse, CategoryPageResponse } from '../types/category'
import categoryService from '../services/category.service'

class GenreController {
  async create(req: Request, res: Response) {
    try {
      const response = await categoryService.create(req, Genre)
      res.status(201).json(new CategoryItemDTO(response as any))
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async list(req: Request, res: Response) {
    try {
      const response = await categoryService.list<CategoryDocument, CategoryItemResponse>(req, Genre)

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
      const bookFilter = {
        genres: {
          $elemMatch: { $eq: new Types.ObjectId(req.params['id']) }
        }
      }
      const { category, books } = await categoryService.page<CategoryDocument, CategoryPageResponse>(req, bookFilter, Genre)

      if (category) {
        res.status(200).json(new CategoryPageDTO(category, books))
      }
    } catch (error) {
      console.log(error)
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
      const response = await categoryService.update(req, Genre, requiredFields)
      res.status(201).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const response = await categoryService.remove(String(req.params['id']), Genre)
      res.status(201).json(response)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default new GenreController()
