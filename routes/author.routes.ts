import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import controller from '../controllers/author.controller'

const router = Router()

router.post(
  '/',
  authMiddleware,
  controller.authorsList
)

router.post(
  '/create',
  authMiddleware,
  controller.create
)

export default router
