import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
// import upload from '../middleware/upload'
import controller from '../controllers/book.controller'

const router = Router()

router.post(
  '/',
  authMiddleware,
  controller.list
)

router.get(
  '/:id',
  authMiddleware,
  controller.item
)

router.post(
  '/:id',
  authMiddleware,
  controller.save
)

// router.post(
//   '/paper',
//   authMiddleware,
//   controller.paperAndEBooks
// )

// router.post(
//   '/create',
//   authMiddleware,
//   controller.create
// )

// router.patch(
//   '/:id',
//   authMiddleware,
//   upload.single('coverImage'),
//   controller.update
// )

// router.post(
//   '/:id/precover',
//   authMiddleware,
//   upload.single('preCoverImage'),
//   controller.setPreCover
// )

// router.delete(
//   '/:id/precover',
//   authMiddleware,
//   controller.removePreCover
// )

// router.post(
//   '/:id/summary',
//   authMiddleware,
//   upload.single('articleImage'),
//   controller.setArticleImage
// )

// router.post(
//   '/summary/images/delete',
//   authMiddleware,
//   upload.single('null'),
//   controller.removeArticleImage
// )

// router.delete(
//   '/:id',
//   authMiddleware,
//   controller.deleteBook
// )

export default router
