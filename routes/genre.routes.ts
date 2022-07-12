import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import controller from '../controllers/genre.controller'

const router = Router()

router.post(
  '/',
  authMiddleware,
  controller.list
)

export default router
