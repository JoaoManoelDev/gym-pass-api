import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  InMemoryCheckInsRepository
} from "@/repositories/in-memory/in-memory-check-ins-repository"
import { ValidateCheckInUseCase } from "@/use-cases/validate-check-in"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { LateCheckInValidationError } from "@/use-cases/errors/late-check-in-validation-error"

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe("Validate Check In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)
    
    vi.useFakeTimers()
  })

  afterEach(async () => {
    vi.useRealTimers()
  })
  
  it("should be able to validate the check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01"
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })

    expect(checkIn.created_at).toEqual(expect.any(Date))
    expect(checkInsRepository.checkIns[0].validated_at).toEqual(expect.any(Date))

  })

  it("should not be able to validate inexistent check-in", async () => {
    await expect(() => sut.execute({
      checkInId: "inexistent-check-in-id"
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it("should not be able to validate the check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01"
    })

    const TWENTY_ONE_MINUTES_IN_SECONDS = 1000 * 60 * 21

    vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_SECONDS)

    await expect(() => sut.execute({
      checkInId: createdCheckIn.id
    })).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
