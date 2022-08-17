import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { categoryValidator } from '../middleware/category.validator'
import controller from '../controllers/genre.controller'

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

router.get(
  '/:id',
  authMiddleware,
  controller.page
)

router.patch(
  '/:id',
  authMiddleware,
  categoryValidator,
  controller.update
)

router.delete(
  '/:id',
  authMiddleware,
  controller.remove
)

export default router
