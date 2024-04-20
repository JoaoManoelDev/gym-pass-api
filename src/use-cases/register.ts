import { hash } from "bcryptjs"

import { PrismaUsersRepository } from "@/repositories/prisma-users-repository"
import { prisma } from "@/lib/prisma"

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export const registerUseCase = async ({
  name,
  email,
  password
}: RegisterUseCaseRequest) => {
  const salt = 6
  const passwordHash = await hash(password, salt)

  const emailAlreadyExists = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (emailAlreadyExists) {
    throw new Error("E-mail already exists.")
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    name,
    email,
    password_hash: passwordHash
  })
}
