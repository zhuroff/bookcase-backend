import { Request } from 'express'
import path from 'path'
import multer from 'multer'

const filenameSlugify = (filename: string): string => {
  return filename.toLowerCase().replace(/ /g, '-')
}

const storage = multer.diskStorage({
  destination (req: Request, file: any, callback: any) {
    const folder = req.query.folder as string
    callback(null, path.resolve(__dirname, '../', 'uploads', folder))
  },

  filename (req: Request, file: any, callback: any) {
    callback(null, `${new Date().getTime()}-${filenameSlugify(file.originalname)}`)
  }
})

const fileFilter = (req: Request, file: any, callback: any) => {
  const supportedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/svg+xml',
    'image/webp',
    'image/apng',
    'image/avif'
  ]

  if (supportedTypes.includes(file.mimetype)) {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

export default multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 5 } })
