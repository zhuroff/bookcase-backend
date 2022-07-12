import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import controller from '../controllers/list.controller'

const router = Router()

router.post(
  '/',
  authMiddleware,
  controller.list
)

// router.get(
//   '/:id',
//   authMiddleware,
//   controller.listFull

// )

// router.get(
//   '/:id/sub',
//   authMiddleware,
//   controller.listShort
// )

export default router
