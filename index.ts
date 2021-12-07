import dotenv from 'dotenv'
import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import passport from 'passport'
import passportStrategy from './middleware/passport-strategy'

import backupRoutes from './routes/backup.routes'
import dashboardRoutes from './routes/dashboard.routes'

dotenv.config()

const app = express()
const PORT = 8000

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error))

app.use(cors())
app.use(passport.initialize())

passport.use(passportStrategy)

app.use(express.urlencoded({ extended: true }))
app.use(json())

app.use('/api/backup', backupRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
