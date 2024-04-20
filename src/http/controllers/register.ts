import { FastifyReply, FastifyRequest } from "fastify"
import { hash } from "bcryptjs"
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

  const salt = 6
  const passwordHash = await hash(password, salt)

  const emailAlreadyExists = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (emailAlreadyExists) {
    return replay.status(409).send()
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash: passwordHash
    }
  })

  return replay.status(201).send()
}
