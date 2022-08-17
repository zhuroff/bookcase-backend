import { body } from 'express-validator'

export const authorValidator = [
  body('firstName')
    .isLength({ min: 1 })
    .withMessage('authors.errors.firstName.required')
]
