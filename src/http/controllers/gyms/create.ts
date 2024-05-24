import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case"

export const create = async (
  request: FastifyRequest,
  replay: FastifyReply
) => {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    })
  })

  const {
    title,
    description,
    phone,
    latitude,
    longitude
  } = createGymBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()

  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude
  })

  return replay.status(201).send()
}
