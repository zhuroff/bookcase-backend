import { Router } from 'express'
import controller from '../controllers/dashboard.controller'

// const passport = require('passport')
const router = Router()

router.get(
  '/reading-books',
  // passport.authenticate('jwt', { session: false }),
  controller.readingNow
)

// router.post(
//   '/admin/read',
//   // passport.authenticate('jwt', { session: false }),
//   controller.getRead
// )

// router.get(
//   '/admin/genres',
//   // passport.authenticate('jwt', { session: false }),
//   controller.genresDiagram
// )

// router.get(
//   '/admin/types',
//   // passport.authenticate('jwt', { session: false }),
//   controller.bookTypesDiagram
// )

// router.get(
//   '/admin/lists',
//   // passport.authenticate('jwt', { session: false }),
//   controller.listsProgress
// )

export default router
