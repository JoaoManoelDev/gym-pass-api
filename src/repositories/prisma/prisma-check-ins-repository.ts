import { CheckIn, Prisma } from "@prisma/client"
import dayjs from "dayjs"

import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { prisma } from "@/lib/prisma"

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data
    })

    return checkIn
  }

  async save(checkIn: CheckIn) {
    const updatedCheckIn = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn
    })

    return updatedCheckIn
  }

  async findById(userId: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: userId
      }
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, data: Date) {
    const startOfTheDay = dayjs(data).startOf("date")
    const endOfTheDay = dayjs(data).endOf("date")

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return checkIns
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })

    return count
  }
}