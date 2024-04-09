import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositores/checkIn-repository";
interface CheckInRequest {
  userId: string;
  gymdId: string;
}

interface CheckInResponse {
  checkIn: CheckIn;
}

export class CheckinUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async handler({ userId, gymdId }: CheckInRequest): Promise<CheckInResponse> {
    const checkOnSameDate = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkOnSameDate) {
      throw new Error();
    }
    const checkIn = await this.checkInRepository.create({
      gym_id: gymdId,
      user_id: userId,
    });
    return {
      checkIn,
    };
  }
}
