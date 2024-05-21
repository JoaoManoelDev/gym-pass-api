import { beforeEach, describe, expect, it } from "vitest"

import { passwordHash } from "@/utils/hash"
import {
  InMemoryUsersRepository
} from "@/repositories/in-memory/in-memory-users-repository"
import { GetUserProfileUseCase } from "@/use-cases/get-user-profile"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password_hash: await passwordHash({ password: "123456" })
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual("John Doe")
  })

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() => sut.execute({
      userId: "non-existing-id"
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
