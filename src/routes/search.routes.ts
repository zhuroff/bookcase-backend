import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import controller from '../controllers/search.controller'

const router = Router()

router.post(
  '/',
  authMiddleware,
  controller.search
)

export default router
