import { NextFunction, Request, Response } from 'express'
import { CONSTANTS } from '../utils/constants'

const checkAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect(CONSTANTS.LOGIN_URL)
}

export default checkAuthenticated
