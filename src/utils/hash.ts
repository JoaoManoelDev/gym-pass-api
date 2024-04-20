import { hash } from "bcryptjs"

interface PasswordHashProps {
  password: string
  salt?: string | number
}

export const passwordHash = async ({
  password,
  salt = 6
}: PasswordHashProps) => {
  return await hash(password, salt)
}