import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { makeGetUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-get-user-check-ins-history-use-case"

export const history = async (
  request: FastifyRequest,
  replay: FastifyReply
) => {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const getUserCheckInsHistoryUseCase = makeGetUserCheckInsHistoryUseCase()

  const { checkIns } = await getUserCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page
  })

  return replay.status(200).send({ checkIns })
}
