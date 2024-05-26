import { FastifyReply, FastifyRequest } from "fastify"

import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case"

export const metrics = async (
  request: FastifyRequest,
  replay: FastifyReply
) => {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return replay.status(200).send({ checkInsCount })
}
