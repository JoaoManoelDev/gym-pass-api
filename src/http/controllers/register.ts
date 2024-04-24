import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import {
  UserAlreadyExistsError
} from "@/use-cases/errors/user-already-exists-error"
import {
  makeRegisterUseCase
} from "@/use-cases/factories/make-register-use-case"

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
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return replay.status(409).send({ message: error.message })
    }

    throw error
  }

  return replay.status(201).send()
}
