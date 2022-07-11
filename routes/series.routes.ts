import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import controller from '../controllers/series.controller'

const router = Router()

router.post(
  '/',
  authMiddleware,
  controller.seriesList
)

router.post(
  '/create',
  authMiddleware,
  controller.create
)

export default router
