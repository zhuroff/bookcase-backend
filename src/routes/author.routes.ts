import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { authorValidator } from '../middleware/author.validator'
import controller from '../controllers/author.controller'

const router = Router()

router.post(
  '/create',
  authMiddleware,
  controller.create
)

router.post(
  '/',
  authMiddleware,
  controller.list
)

router.post(
  '/:id',
  authMiddleware,
  controller.page
)

router.patch(
  '/:id',
  authMiddleware,
  authorValidator,
  controller.update
)

router.delete(
  '/:id',
  authMiddleware,
  controller.remove
)

export default router
