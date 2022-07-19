import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import controller from '../controllers/genre.controller'

const router = Router()

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
  controller.update
)

export default router
