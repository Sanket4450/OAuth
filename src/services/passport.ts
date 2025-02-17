import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth2'
import { getUserData, saveUserData } from '../services/user'

export const setupPassport = (passport: passport.PassportStatic) => {
  const authUser = (
    request: any,
    accessToken: any,
    refreshToken: any,
    profile: any,
    done: any
  ) => {
    return done(null, profile)
  }

  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
        passReqToCallback: true,
      },
      authUser
    )
  )

  passport.serializeUser(async (user: any, done) => {
    const existingUsersData = await getUserData()
    saveUserData(existingUsersData, user)
    done(null, user)
  })

  passport.deserializeUser((user: any, done) => {
    done(null, user)
  })
}
