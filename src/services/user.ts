import { readFileAsync, writeFileAsync } from '../utils/fn'
import { join } from 'path'

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
  const createUserData = {
    id: user.id,
    given_name: user.given_name,
    family_name: user.family_name,
    email: user.email,
  }

  if (
    existingUsersData.findIndex((u) => u.email === createUserData.email) === -1
  ) {
    existingUsersData.push(createUserData)
    writeFileAsync(usersDataPath, JSON.stringify(existingUsersData))
  }
}
