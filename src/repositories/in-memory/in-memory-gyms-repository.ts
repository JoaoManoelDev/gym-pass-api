import { randomUUID } from "node:crypto"
import { Gym, Prisma } from "@prisma/client"

import { GymsRepository } from "../gym-repository"

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
}
