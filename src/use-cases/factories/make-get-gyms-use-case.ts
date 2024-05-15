import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { GetGymsUseCase } from "../get-gyms"

export const makeGetGymsUseCase = () => {
  const prismaGymsRepository = new PrismaGymsRepository()
  const getGymsUseCase = new GetGymsUseCase(prismaGymsRepository)

  return getGymsUseCase
}
