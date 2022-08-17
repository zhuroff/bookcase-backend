import { body } from 'express-validator'

export const categoryValidator = [
  body('title')
    .isLength({ min: 1 })
    .withMessage('common.errors.title')
]
