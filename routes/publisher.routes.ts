import { Router } from 'express'
import passport from 'passport'
import controller from '../controllers/publisher.controller'

const router = Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.publishersList
)

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  controller.create
)

export default router
