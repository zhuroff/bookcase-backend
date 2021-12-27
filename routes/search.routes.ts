import { Router } from 'express'
import passport from 'passport'
import controller from '../controllers/search.controller'

const router = Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.search
)

export default router
