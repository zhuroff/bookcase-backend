import dotenv from 'dotenv'
import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import passport from 'passport'
import passportStrategy from './middleware/passport-strategy'

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

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
