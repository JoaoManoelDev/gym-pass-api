import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case"

export const create = async (
  request: FastifyRequest,
  replay: FastifyReply
) => {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)
  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const checkInUseCase = makeCheckInUseCase()

  await checkInUseCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return replay.status(201).send()
}
