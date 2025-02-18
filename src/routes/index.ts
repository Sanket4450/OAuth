import express, { Request, Response } from 'express'

import authRouter from './auth'
import checkAuthenticated from '../middlewares/checkAuthenticated'

const router = express.Router()

// Dashboard route (Base)
router.get('/dashboard', checkAuthenticated, (req: Request, res: Response) => {
  res.render('dashboard.ejs', { name: (req?.user as any).displayName })
})

// Auth Routes
router.use('/auth', authRouter)

export default router
