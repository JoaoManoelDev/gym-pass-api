import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { makeGetGymsUseCase } from "@/use-cases/factories/make-get-gyms-use-case"

export const search = async (
  request: FastifyRequest,
  replay: FastifyReply
) => {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const {
    q,
    page
  } = searchGymsQuerySchema.parse(request.query)

  const getGymsUseCase = makeGetGymsUseCase()

  const { gyms } = await getGymsUseCase.execute({
    query: q,
    page
  })

  return replay.status(200).send({ gyms })
}
