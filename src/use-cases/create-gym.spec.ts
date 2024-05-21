import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CreateGymUseCase } from "@/use-cases/create-gym"

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "NodeJs Gym",
      description: null,
      phone: null,
      latitude: 22.860852,
      longitude: -43.2406528,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
