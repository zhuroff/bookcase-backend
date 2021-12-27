import dotenv from 'dotenv'
import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import passport from 'passport'
import passportStrategy from './middleware/passport-strategy'

import backupRoutes from './routes/backup.routes'
import userRoutes from './routes/user.routes'
import dashboardRoutes from './routes/dashboard.routes'
import bookRoutes from './routes/book.routes'
import authorRoutes from './routes/author.routes'
import publisherRoutes from './routes/publisher.routes'
import genreRoutes from './routes/genre.routes'
import seriesRoutes from './routes/series.routes'
import listRoutes from './routes/list.routes'
import searchRoutes from './routes/search.routes'

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
app.use('/api/users', userRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/authors', authorRoutes)
app.use('/api/publishers', publisherRoutes)
app.use('/api/genres', genreRoutes)
app.use('/api/series', seriesRoutes)
app.use('/api/lists', listRoutes)
app.use('/api/search', searchRoutes)

app.use('/uploads', express.static(__dirname + '/uploads'))

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
