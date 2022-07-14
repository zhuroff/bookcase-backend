import { Request, Response } from 'express'
import { Author } from '../models/author.model'
import { CategoryAuthorItemDTO, CategoryAuthorPageDTO } from '../dto/category.dto'
import { AuthorModel } from '../types/Category'
import categoryService from '../services/category.service'

class AuthorController {
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
}

const computedTitle = (firstName: string, lastName: string | null, patronymicName: string | null): string => {
  if (lastName) {
    return `${lastName}, ${firstName}` + (patronymicName ? ` ${patronymicName}` : '')
  }

  return firstName
}

const create = async (req: Request, res: Response) => {
  const payload = {
    firstName: req.body.firstName || '',
    lastName: req.body.lastName || null,
    patronymicName: req.body.patronymicName || null,
    isDraft: req.body.isDraft,
    title: computedTitle(req.body.firstName, req.body.lastName, req.body.patronymicName),
    books: []
  }

  const author = new Author(payload)

  try {
    await author.save()
    res.status(201).json(author)
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  create,
}

console.log(controller)

export default new AuthorController()
