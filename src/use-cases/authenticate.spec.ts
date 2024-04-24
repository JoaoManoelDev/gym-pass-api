import { beforeEach, describe, expect, it } from "vitest"

import { passwordHash } from "@/utils/hash"
import {
  InMemoryUsersRepository
} from "@/repositories/in-memory/in-memory-users-repository"
import { AuthenticateUseCase } from "./authenticate"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  
  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password_hash: await passwordHash({ password: "123456" })
    })

    const { user } = await sut.execute({
      email: "johndoe@email.com",
      password: "123456"
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() => sut.execute({
      email: "johndoe@email.com",
      password: "123456"
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password_hash: await passwordHash({ password: "123456" })
    })

    await expect(() => sut.execute({
      email: "johndoe@email.com",
      password: "654321"
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
