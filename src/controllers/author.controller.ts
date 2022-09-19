import { Request, Response } from 'express'
import { Types } from 'mongoose'
import { Author } from '../models/author.model'
import { CategoryAuthorItemDTO, CategoryAuthorPageDTO } from '../dto/category.dto'
import { AuthorDocument, AuthorItemResponse, AuthorPageResponse } from '../types/category'
import categoryService from '../services/category.service'

class AuthorController {
  async create(req: Request, res: Response) {
    try {
      const response = await categoryService.create(req, Author)
      res.status(201).json(new CategoryAuthorItemDTO(response as any))
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async list(req: Request, res: Response) {
    try {
      const select = {
        firstName: true,
        lastName: true,
        patronymicName: true
      }
      const response = await categoryService.list<AuthorDocument, AuthorItemResponse>(req, Author, select)

      res.status(200).json({
        ...response,
        docs: response.docs.map((doc) => new CategoryAuthorItemDTO(doc))
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async page(req: Request, res: Response) {
    try {
      const bookFilter = {
        authors: {
          $elemMatch: { author: { $eq: new Types.ObjectId(req.params['id']) } }
        }
      }
      const { category, books } = await categoryService.page<AuthorDocument, AuthorPageResponse>(req, bookFilter, Author)

      if (category) {
        res.status(200).json(new CategoryAuthorPageDTO(category, books))
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const requiredFields: string[] = Object.entries(Author.schema.paths).reduce<string[]>((acc, [key, { validators }]) => {
        if (validators.length && key !== 'isDraft') {
          acc.push(key)
        }
        return acc
      }, [])
      const response = await categoryService.update(req, Author, requiredFields)
      res.status(201).json(response)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const response = await categoryService.remove(String(req.params['id']), Author)
      res.status(201).json(response)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default new AuthorController()
