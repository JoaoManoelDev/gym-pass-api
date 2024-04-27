import { Gym, Prisma } from "@prisma/client"

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  getMany(query: string, page: number): Promise<Gym[]>
  create(gym: Prisma.GymCreateInput): Promise<Gym>
}
