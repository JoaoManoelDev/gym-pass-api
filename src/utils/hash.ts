import { compare, hash } from "bcryptjs"

interface PasswordHashProps {
  password: string
  salt?: string | number
}

interface ComparePasswordProps {
  password: string
  hash: string
}

export const passwordHash = async ({
  password,
  salt = 6
}: PasswordHashProps) => {
  return await hash(password, salt)
}

export const comparePassword = async ({
  password,
  hash
}: ComparePasswordProps) => {
  const passwordCompared = await compare(password, hash)

  return passwordCompared
}