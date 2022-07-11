import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import controller from '../controllers/publisher.controller'

const router = Router()

router.post(
  '/',
  authMiddleware,
  controller.publishersList
)

router.post(
  '/create',
  authMiddleware,
  controller.create
)

export default router
