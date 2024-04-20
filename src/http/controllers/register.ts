import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { RegisterUseCase } from "@/use-cases/register"
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository"

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
    
    registerUseCase.execute({ name, email, password })
  } catch (error) {
    return replay.status(409).send()
  }

  return replay.status(201).send()
}
