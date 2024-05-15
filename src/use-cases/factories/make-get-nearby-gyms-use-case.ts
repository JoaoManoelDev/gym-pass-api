import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { GetNearbyGymsUseCase } from "../get-nearby-gyms"

export const makeGetNearbyGymsUseCase = () => {
  const prismaGymsRepository = new PrismaGymsRepository()
  const getNearbyGymsUseCase = new GetNearbyGymsUseCase(prismaGymsRepository)

  return getNearbyGymsUseCase
}
