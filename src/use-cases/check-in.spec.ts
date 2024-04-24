import { beforeEach, describe, expect, it } from "vitest"

import { CheckInUseCase } from "./check-in"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { comparePassword } from "@/utils/hash"
import {
  InMemoryCheckInsRepository
} from "@/repositories/in-memory/in-memory-check-ins-repository"

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe("Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01"
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
