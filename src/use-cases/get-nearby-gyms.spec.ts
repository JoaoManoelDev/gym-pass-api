import { beforeEach, describe, expect, it } from "vitest"

import {
  InMemoryGymsRepository
} from "@/repositories/in-memory/in-memory-gyms-repository"
import { GetNearbyGymsUseCase } from "./get-nearby-gyms"

let gymsRepository: InMemoryGymsRepository
let sut: GetNearbyGymsUseCase

describe("Get Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new GetNearbyGymsUseCase(gymsRepository)
  })

  it("should be able to get nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: 22.860852,
      longitude: -43.2406528,
    })

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -22.3779725,
      longitude: -43.8677777,
    })

    const { gyms } = await sut.execute({
      userLatitude: 22.860852,
      userLongitude: -43.2406528
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Near Gym" }),
    ])
  })

})
