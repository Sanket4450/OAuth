import passport from 'passport'
import GoogleStrategy, {
  VerifyFunctionWithRequest,
} from 'passport-google-oauth2'
import GithubStrategy from 'passport-github2'
import { getUserData, saveUserData } from '../services/user'

export const setupPassport = (passport: passport.PassportStatic) => {
  const verifyAuth: VerifyFunctionWithRequest = (
    _request,
    _accessToken,
    _refreshToken,
    profile,
    done
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
      verifyAuth
    )
  )

  passport.use(
    new GithubStrategy.Strategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        callbackURL: process.env.GITHUB_CALLBACK_URL as string,
        passReqToCallback: true,
      },
      verifyAuth
    )
  )

  passport.serializeUser(async (user: Express.User, done) => {
    console.log(user)
    const existingUsersData = await getUserData()
    try {
      const userId = saveUserData(existingUsersData, user)
      done(null, userId)
    } catch (error: any) {
      done(error.message)
    }
  })

  passport.deserializeUser((user: any, done) => {
    done(null, user)
  })
}
