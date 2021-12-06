import { Router } from 'express'
import controller from '../controllers/backup.controller'

const router = Router()

router.post('/books', controller.backupBooks)
router.post('/authors', controller.backupAuthors)
router.post('/genres', controller.backupGenres)
router.post('/lists', controller.backupLists)
router.post('/publishers', controller.backupPublishers)
router.post('/series', controller.backupSeries)

export default router
