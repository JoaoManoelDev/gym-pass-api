import { hash } from "bcryptjs"

import { prisma } from "@/lib/prisma"

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(
    private usersRepository: any
  ) { }

  async execute({
    name,
    email,
    password
  }: RegisterUseCaseRequest) {
    const salt = 6
    const passwordHash = await hash(password, salt)
  
    const emailAlreadyExists = await prisma.user.findUnique({
      where: {
        email
      }
    })
  
    if (emailAlreadyExists) {
      throw new Error("E-mail already exists.")
    }
  

  
    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash
    })
  }
}
