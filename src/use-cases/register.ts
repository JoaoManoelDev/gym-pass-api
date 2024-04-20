import { UsersRepository } from "@/repositories/users-repository"
import { passwordHash } from "@/utils/hash"

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository
  ) { }

  async execute({
    name,
    email,
    password
  }: RegisterUseCaseRequest) {

    const emailAlreadyExists = await this.usersRepository.findByEmail(email)
  
    if (emailAlreadyExists) {
      throw new Error("E-mail already exists.")
    }

    const passwordHashed = await passwordHash({ password })
  
    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHashed
    })
  }
}
