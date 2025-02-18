import express, { NextFunction, Request, Response } from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/login', (_req: Request, res: Response, _next: NextFunction) => {
  res.render('login')
})

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    successRedirect: '/auth/dashboard',
    failureRedirect: '/auth/login',
  })
)

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  (_req: Request, res: Response) => {
    res.redirect('/auth/dashboard')
  }
)

const checkAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/auth/login')
}

router.get('/dashboard', checkAuthenticated, (req: Request, res: Response) => {
  res.render('dashboard.ejs', { name: (req?.user as any).displayName })
})

export default router
