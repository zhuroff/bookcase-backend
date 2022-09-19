import fs from 'fs'
import path from 'path'

class CommonService {
  removeMediaFile(filename: string) {
    fs.rm(
      path.join(__dirname, '../', filename),
      { recursive: true },
      (error) => {
        if (error) {
          throw new Error(error.message)
        }
      }
    )
  }
}

export default new CommonService()
