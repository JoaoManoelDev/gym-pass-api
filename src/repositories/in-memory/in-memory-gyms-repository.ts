import { randomUUID } from "node:crypto"
import { Gym, Prisma } from "@prisma/client"

import { FindManyNearbyParams, GymsRepository } from "../gym-repository"
import {
  getDistanceBetweenCoordinates
} from "@/utils/get-distance-between-coordinates"

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async create(gym: Prisma.GymCreateInput) {
    const newGym = {
      id: gym.id ?? randomUUID(),
      title: gym.title,
      description: gym.description ?? null,
      phone: gym.phone ?? null,
      latitude: new Prisma.Decimal(gym.latitude.toString()),
      longitude: new Prisma.Decimal(gym.longitude.toString()),
      created_at: new Date()
    }

    this.gyms.push(newGym)

    return newGym
  }

  async findById(id: string) {
    const gym = this.gyms.find(gym => gym.id === id)

    if (!gym) return null

    return gym
  }

  async getMany(query: string, page: number) {
    return this.gyms
      .filter(gym => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.gyms.filter(gym => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() },
      )

      const MAX_DISTANCE_IN_KILOMETERS = 10

      return distance < MAX_DISTANCE_IN_KILOMETERS
    })
  }
}
