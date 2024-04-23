import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { AuthenticateUseCase } from "@/use-cases/authenticate"
import {
  PrismaUsersRepository
} from "@/repositories/prisma/prisma-users-repository"
import {
  InvalidCredentialsError
} from "@/use-cases/errors/invalid-credentials-error"

export const authenticate = async (
  request: FastifyRequest,
  replay: FastifyReply
) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)
    
    await authenticateUseCase.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return replay.status(40).send({ message: error.message })
    }

    throw error
  }

  return replay.status(200).send()
}
