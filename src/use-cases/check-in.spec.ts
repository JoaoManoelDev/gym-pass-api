import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { Decimal } from "@prisma/client/runtime/library"

import { CheckInUseCase } from "./check-in"
import {
  InMemoryCheckInsRepository
} from "@/repositories/in-memory/in-memory-check-ins-repository"
import {
  InMemoryGymsRepository
} from "@/repositories/in-memory/in-memory-gyms-repository"
import {
  MaxNumberOfCheckInsError
} from "./errors/max-number-of-check-ins-error"
import { MaxDistanceError } from "./errors/max-distance-error"

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe("Check In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: "gym-01",
      title: "NodeJs Gym",
      description: "",
      phone: "",
      latitude: 22.860852,
      longitude: -43.2406528,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: 22.860852,
      userLongitude: -43.2406528
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 0, 25, 8, 0, 0))

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: 22.860852,
      userLongitude: -43.2406528
    })

    await expect(() => 
      sut.execute({
        userId: "user-01",
        gymId: "gym-01",
        userLatitude: 22.860852,
        userLongitude: -43.2406528
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })
  
  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2024, 0, 25, 8, 0, 0))

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: 22.860852,
      userLongitude: -43.2406528
    })

    vi.setSystemTime(new Date(2024, 0, 26, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: 22.860852,
      userLongitude: -43.2406528
    })

    expect(checkIn.id).toEqual(expect.any(String))

  })

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.gyms.push({
      id: "gym-02",
      title: "NodeJs Gym",
      description: "",
      latitude: new Decimal(-22.8585729),
      longitude: new Decimal(-43.249193),
      phone: ""
    })

    await expect(() => sut.execute({
      userId: "user-01",
      gymId: "gym-02",
      userLatitude: 22.860852,
      userLongitude: -43.2406528
    })).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
