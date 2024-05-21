import { Gym } from "@prisma/client"

import { GymsRepository } from "@/repositories/gym-repository"

interface GetGymsUseCaseRequest {
  query: string
  page: number
}

interface GetGymsUseCaseResponse {
  gyms: Gym[]
}

export class GetGymsUseCase {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    query,
    page
  }: GetGymsUseCaseRequest): Promise<GetGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.getMany(query, page)

    return { gyms }
  }
}
