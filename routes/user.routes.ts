import { Router } from 'express'
// import passport from 'passport'
import controller from '../controllers/user.controller'

const router = Router()

router.post('/create', controller.create)

export default router
