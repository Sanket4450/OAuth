import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'
import passport from 'passport'
import { join } from 'path'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import session from 'express-session'
import router from './routes'
import { setupPassport } from './services/passport'

dotenv.config()

const app = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

setupPassport(passport)

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('App is running')
})

// Routes
app.use('/', router)

export default app
