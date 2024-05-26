import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case"

export const validate = async (
  request: FastifyRequest,
  replay: FastifyReply
) => {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid()
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId
  })

  return replay.status(204).send()
}
