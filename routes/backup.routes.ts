import { Router } from 'express'
import controller from '../controllers/backup.controller'

const router = Router()

router.get('/list', controller.list)
router.post('/xlsx/:model', controller.backupsXLSX)
router.post('/save/:model', controller.backupSave)
router.post('/restore/:model', controller.backupRestore)

export default router
