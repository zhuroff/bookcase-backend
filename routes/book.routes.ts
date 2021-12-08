import { Router } from 'express'
import passport from 'passport'
import controller from '../controllers/book.controller'

const router = Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.booksList
)

export default router
