import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { RegisterUseCase } from "@/use-cases/register"
import {
  PrismaUsersRepository
} from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"

export const register = async (
  request: FastifyRequest,
  replay: FastifyReply
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)
    
    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return replay.status(409).send({ message: error.message })
    }

    return replay.status(500).send()
  }

  return replay.status(201).send()
}
