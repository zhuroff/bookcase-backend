import { Router } from 'express'
import passport from 'passport'
import controller from '../controllers/genre.controller'

const router = Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.genresList
)

export default router
