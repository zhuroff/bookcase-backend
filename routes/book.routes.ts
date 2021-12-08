import { Router } from 'express'
import passport from 'passport'
import controller from '../controllers/book.controller'

const router = Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.booksList
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.bookItem
)

export default router
