import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepository } from "../checkIn-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkOnSameDate = this.items.find(
      (checkIn) => checkIn.user_id === userId,
    );

    if (!checkOnSameDate) {
      return null;
    }
    return checkOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
