import { Router } from 'express'
import controller from '../controllers/backup.controller'

const router = Router()

router.post('/books/save', controller.backupBooksSave)
router.post('/authors/save', controller.backupAuthorsSave)
router.post('/genres/save', controller.backupGenresSave)
router.post('/lists/save', controller.backupListsSave)
router.post('/publishers/save', controller.backupPublishersSave)
router.post('/series/save', controller.backupSeriesSave)

router.post('/books/restore', controller.backupBooksRestore)
router.post('/authors/restore', controller.backupAuthorsRestore)
router.post('/genres/restore', controller.backupGenresRestore)
router.post('/lists/restore', controller.backupListsRestore)
router.post('/publishers/restore', controller.backupPublishersRestore)
router.post('/series/restore', controller.backupSeriesRestore)

export default router
