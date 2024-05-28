import { FastifyInstance } from "fastify"
import request from "supertest"

import { prisma } from "@/lib/prisma"
import { passwordHash } from "@/utils/hash"

export const createAndAuthenticateUser = async (
  app: FastifyInstance,
  {isAdmin = false} = {}
) => {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@email.com",
      password_hash: await passwordHash({ password: "123456" }),
      role: isAdmin ? "ADMIN" : "MEMBER"
    }
  })

  const authResponse = await request(app.server)
    .post("/sessions")
    .send({
      email: "johndoe@email.com",
      password: "123456"
    })

  const { token } = authResponse.body

  return {
    token
  }
}
