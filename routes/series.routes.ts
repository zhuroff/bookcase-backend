import { Router } from 'express'
import passport from 'passport'
import controller from '../controllers/series.controller'

const router = Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.seriesList
)

export default router
