import { randomUUID } from "node:crypto"
import { Prisma, User } from "@prisma/client"

import { UsersRepository } from "../users-repository"

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async create(user: Prisma.UserCreateInput) {
    const newUser = {
      id: randomUUID(),
      name: user.name,
      email: user.email,
      password_hash: user.password_hash,
      created_at: new Date()
    }

    this.users.push(newUser)

    return newUser
  }

  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email)

    if (!user) return null

    return user
  }

  async findById(id: string) {
    const user = this.users.find(user => user.id === id)

    if (!user) return null

    return user
  }
}
