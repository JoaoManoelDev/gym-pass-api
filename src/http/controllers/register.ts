import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { prisma } from "@/lib/prisma"

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

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash: password
    }
  })

  return replay.status(201).send()
}