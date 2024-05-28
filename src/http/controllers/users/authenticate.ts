import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case"

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
    const authenticateUseCase = makeAuthenticateUseCase()
    
    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await replay.jwtSign({
      role: user.role
    }, {
      sign: {
        sub: user.id
      }
    })

    const refreshToken = await replay.jwtSign({
      role: user.role
    }, {
      sign: {
        sub: user.id,
        expiresIn: "7d"
      }
    })

    return replay
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true
      })
      .status(200)
      .send({ token })

  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return replay.status(400).send({ message: error.message })
    }

    throw error
  }
}
