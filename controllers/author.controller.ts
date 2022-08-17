import { Request, Response } from 'express'
import { Author } from '../models/author.model'
import { CategoryAuthorItemDTO, CategoryAuthorPageDTO } from '../dto/category.dto'
import { AuthorModel } from '../types/Category'
import categoryService from '../services/category.service'

class AuthorController {
  async create(req: Request, res: Response) {
    try {
      const response = await categoryService.create<AuthorModel>(req, Author)
      res.status(201).json(new CategoryAuthorItemDTO(response as AuthorModel))
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
      const response = await categoryService.list<AuthorModel>(req, Author, selectExtends)

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
      const response = await categoryService.page<AuthorModel>(req, Author)

      if (response) {
        // @ts-ignore
        res.status(200).json(new CategoryAuthorPageDTO(response))
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
      const response = await categoryService.update<AuthorModel>(req, Author, requiredFields)
      return res.status(201).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const response = await categoryService.remove<AuthorModel>(String(req.params['id']), Author)
      return res.status(201).json(response)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default new AuthorController()
