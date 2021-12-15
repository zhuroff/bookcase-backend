import { Router } from 'express'
import passport from 'passport'
import controller from '../controllers/list.controller'

const router = Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.listsCollections
)

export default router
