import express, { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { CONSTANTS } from '../utils/constants'

const router = express.Router()

// Login Route
router.get('/login', (_req: Request, res: Response, _next: NextFunction) => {
  res.render('login')
})

// Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    successRedirect: CONSTANTS.SUCCESS_REDIRECT_URL,
    failureRedirect: CONSTANTS.LOGIN_URL,
  })
)

// Github OAuth
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: CONSTANTS.SUCCESS_REDIRECT_URL,
    failureRedirect: CONSTANTS.LOGIN_URL,
  })
)


export default router
