import { describe, expect, it } from "vitest"

import { passwordHash } from "@/utils/hash"
import {
  InMemoryUsersRepository
} from "@/repositories/in-memory/in-memory-users-repository"
import { AuthenticateUseCase } from "./authenticate"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() => sut.execute({
      email: "johndoe@email.com",
      password: "123456"
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password_hash: await passwordHash({ password: "123456" })
    })

    expect(() => sut.execute({
      email: "johndoe@email.com",
      password: "654321"
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
