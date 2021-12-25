import { Router } from 'express'
import passport from 'passport'
import controller from '../controllers/author.controller'

const router = Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.authorsList
)

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  controller.create
)

export default router
