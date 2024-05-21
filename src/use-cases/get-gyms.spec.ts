import { beforeEach, describe, expect, it } from "vitest"

import { GetGymsUseCase } from "@/use-cases/get-gyms"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"

let gymsRepository: InMemoryGymsRepository
let sut: GetGymsUseCase

describe("Get Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new GetGymsUseCase(gymsRepository)
  })

  it("should be able to get for gyms", async () => {
    await gymsRepository.create({
      title: "NodeJs Gym",
      description: null,
      phone: null,
      latitude: 22.860852,
      longitude: -43.2406528,
    })

    await gymsRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: 22.860852,
      longitude: -43.2406528,
    })

    const { gyms } = await sut.execute({
      query: "TypeScript",
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "TypeScript Gym" }),
    ])
  })

  it("should be able to get paginated gyms", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `NodeJs Gym ${i}`,
        description: null,
        phone: null,
        latitude: 22.860852,
        longitude: -43.2406528,
      })
    }

    const { gyms } = await sut.execute({
      query: "NodeJs",
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "NodeJs Gym 21" }),
      expect.objectContaining({ title: "NodeJs Gym 22" })
    ])
  })
})
