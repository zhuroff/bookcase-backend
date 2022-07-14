import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import controller from '../controllers/author.controller'

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

// router.post(
//   '/create',
//   authMiddleware,
//   controller.create
// )

export default router
