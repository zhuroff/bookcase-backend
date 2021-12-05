import { Router } from 'express'
import controller from '../controllers/user.controller'

const router = Router()

router.get('/', controller.test)

export default router
