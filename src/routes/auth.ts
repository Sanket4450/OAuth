import express, { NextFunction, Request, Response } from 'express'
import passport from 'passport'

const router = express.Router()

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

router.get('/login', function (req, res, next) {
  res.render('login')
})

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
