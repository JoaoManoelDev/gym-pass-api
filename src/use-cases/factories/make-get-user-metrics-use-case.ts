import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { GetUserMetricsUseCase } from "../get-user-metrics"

export const makeGetUserMetricsUseCase = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(prismaCheckInsRepository)

  return getUserMetricsUseCase
}
