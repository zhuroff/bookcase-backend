import { Request, Response } from 'express'
import { getCategories } from '../shared/caterories-getters'
import Author from '../models/author.model'

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
  } catch(error) {
    res.status(500).json(error)
  }
}

const authorsList = async (req: Request, res: Response) => {
  try {
    const response = await getCategories(req, Author)
    res.json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

const controller = {
  create,
  authorsList
}

export default controller
