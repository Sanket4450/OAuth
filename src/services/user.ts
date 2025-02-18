import { PROVIDERS } from '../utils/constants'
import { readFileAsync, writeFileAsync } from '../utils/fn'
import { join } from 'path'
import { v4 as uuid } from 'uuid'

const usersDataPath = join(process.cwd(), 'data', 'users.json')

export const getUserData = async () => {
  const data = await readFileAsync(usersDataPath, { encoding: 'utf-8' })

  let parsedData = []

  try {
    parsedData = JSON.parse(data)
  } catch (error) {}

  return parsedData
}

export const saveUserData = (existingUsersData: any[], user: any) => {
  let id = uuid()
  let createUserData = null

  switch (user?.provider) {
    case PROVIDERS.GOOGLE:
      createUserData = {
        id,
        name: user.displayName,
        email: user.email,
      }
      break

    case PROVIDERS.GITHUB:
      createUserData = {
        id,
        name: user.displayName,
        email: user.emails[0].value,
      }
      break
  }

  if (!createUserData) throw new Error('Error reading user data!')

  const existingUser = existingUsersData.find(
    (u) => u.email === createUserData.email
  )

  if (!existingUser) {
    existingUsersData.push(createUserData)
    writeFileAsync(usersDataPath, JSON.stringify(existingUsersData))

    return createUserData.id
  }

  return existingUser.id
}
