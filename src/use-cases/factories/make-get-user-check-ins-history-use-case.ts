import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { GetUserCheckInsHistoryUseCase } from "../get-user-check-ins-history"

export const makeGetUserCheckInsHistoryUseCase = () => {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const getUserCheckInsHistoryUseCase = new GetUserCheckInsHistoryUseCase(prismaCheckInsRepository)

  return getUserCheckInsHistoryUseCase
}
