import { randomUUID } from "node:crypto"
import { CheckIn, Prisma } from "@prisma/client"
import dayjs from "dayjs"

import { CheckInsRepository } from "@/repositories/check-ins-repository"

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async save(newCheckIn: CheckIn) {
    const checkInIndex = this.checkIns
      .findIndex(checkIn => checkIn.id === newCheckIn.id)

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = newCheckIn
    }

    return newCheckIn
  }

  async findByUserIdOnDate(userId: string, data: Date) {
    const startOfTheDay = dayjs(data).startOf("date")
    const endOfTheDay = dayjs(data).endOf("date")

    const checkOnSameDate = this.checkIns.find(checkIn => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkOnSameDate) return null

    return checkOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.checkIns
      .filter(checkIn => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string) {
    return this.checkIns.filter(checkIn => checkIn.user_id === userId).length
  }

  async findById(checkInId: string) {
    const checkIn = this.checkIns.find(checkIn => checkIn.id === checkInId)

    if (!checkIn) return null

    return checkIn
  }
}
