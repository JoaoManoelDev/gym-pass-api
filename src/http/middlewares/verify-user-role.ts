import { FastifyReply, FastifyRequest } from "fastify"

export const verifyUserRole = async (roleToVerify: "ADMIN" | "MEMBER") => {
  return (
    request: FastifyRequest,
    replay: FastifyReply
  ) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      return replay.status(401).send({ message: "Unauthorized." })
    }
  }
}
