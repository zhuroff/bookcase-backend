import { Request, Response } from 'express'
import { Types } from 'mongoose'
import { Author } from '../models/author.model'
import { CategoryAuthorItemDTO, CategoryAuthorPageDTO } from '../dto/category.dto'
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
      const selectExtends = {
        firstName: true,
        lastName: true,
        patronymicName: true
      }
      const response = await categoryService.list(req, Author, selectExtends)

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
      const { category, books } = await categoryService.page(req, bookFilter, Author)

      if (category && books) {
        res.status(200).json(new CategoryAuthorPageDTO({ ...category, books }))
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const requiredFields = Object.entries(Author.schema.paths).reduce<string[]>((acc, [key, { validators }]) => {
        if (validators.length && key !== 'isDraft') {
          acc.push(key)
        }
        return acc
      }, [])
      const response = await categoryService.update(req, Author, requiredFields)
      return res.status(201).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const response = await categoryService.remove(String(req.params['id']), Author)
      return res.status(201).json(response)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default new AuthorController()
