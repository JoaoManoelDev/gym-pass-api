import { FastifyReply, FastifyRequest } from "fastify"

export const profile = async (
  request: FastifyRequest,
  replay: FastifyReply
) => {
  await request.jwtVerify()

  console.log(request.user.sub)

  return replay.status(200).send()
}
