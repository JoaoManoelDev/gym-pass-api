import { Gym, Prisma } from "@prisma/client"

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  getMany(query: string, page: number): Promise<Gym[]>
  create(gym: Prisma.GymCreateInput): Promise<Gym>
}
