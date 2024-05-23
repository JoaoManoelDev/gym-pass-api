import { FastifyReply, FastifyRequest } from "fastify"

export const verifyJWT = async (
  request: FastifyRequest,
  replay: FastifyReply
) => {
  try {
    await request.jwtVerify()
  } catch (error) {
    return replay.status(401).send({ message: "Unauthorized." })
  }
}
