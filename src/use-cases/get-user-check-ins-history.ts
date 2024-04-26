import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { CheckIn } from "@prisma/client"

interface GetUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface GetUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
} 

export class GetUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page
  }: GetUserCheckInsHistoryUseCaseRequest): Promise<
    GetUserCheckInsHistoryUseCaseResponse
  > {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    )

    return { checkIns }
  }
}