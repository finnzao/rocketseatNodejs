import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositores/checkIn-repository";
import { GymsRepository } from "@/repositores/gym-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
interface CheckInRequest {
  userId: string;
  gymdId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInResponse {
  checkIn: CheckIn;
}

export class CheckinUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async handler({
    userId,
    gymdId,
    userLatitude,
    userLongitude,
  }: CheckInRequest): Promise<CheckInResponse> {
    const gym = await this.gymsRepository.findById(gymdId);
    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    );
    const MAX_DISTANTE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANTE_IN_KILOMETERS) {
      throw new Error();
    }
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
