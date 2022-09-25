import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import controller from '../controllers/dashboard.controller'

const router = Router()

router.post(
  '/reading-books',
  authMiddleware,
  controller.reading
)

router.post(
  '/read-books',
  authMiddleware,
  controller.read
)

// router.get(
//   '/admin/genres',
//   authMiddleware,
//   controller.genresDiagram
// )

// router.get(
//   '/admin/types',
//   authMiddleware,
//   controller.bookTypesDiagram
// )

// router.get(
//   '/admin/lists',
//   authMiddleware,
//   controller.listsProgress
// )

export default router
