import { Router } from 'express'
import passport from 'passport'
import controller from '../controllers/list.controller'

const router = Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.listsCollections
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.listFull

)

router.get(
  '/:id/sub',
  passport.authenticate('jwt', { session: false }),
  controller.listShort
)

export default router
