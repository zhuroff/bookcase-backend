import { Router } from 'express'
import passport from 'passport'
import upload from '../middleware/upload'
import controller from '../controllers/book.controller'

const router = Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.booksList
)

router.post(
  '/paper',
  passport.authenticate('jwt', { session: false }),
  controller.paperAndEBooks
)

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  controller.create
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.bookItem
)

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  upload.single('coverImage'),
  controller.update
)

router.post(
  '/:id/precover',
  passport.authenticate('jwt', { session: false }),
  upload.single('preCoverImage'),
  controller.setPreCover
)

router.delete(
  '/:id/precover',
  passport.authenticate('jwt', { session: false }),
  controller.removePreCover
)

router.post(
  '/:id/summary',
  passport.authenticate('jwt', { session: false }),
  upload.single('articleImage'),
  controller.setArticleImage
)

router.post(
  '/summary/images/delete',
  passport.authenticate('jwt', { session: false }),
  upload.single('null'),
  controller.removeArticleImage
)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.deleteBook
)

export default router
