import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositores/checkIn-repository";
import { GymsRepository } from "@/repositores/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxNumberOfCheckInError } from "./errors/max-number-of-check-in";
import { MaxDistanceError } from "./errors/max-distance-error";

interface CheckInRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInResponse {
  checkIn: CheckIn;
}

export class CheckinUseCase {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async handler({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInRequest): Promise<CheckInResponse> {
    const gym = await this.gymsRepository.findById(gymId);
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
      throw new MaxDistanceError();
    }
    const checkOnSameDate = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkOnSameDate) {
      throw new MaxNumberOfCheckInError();
    }
    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });
    return {
      checkIn,
    };
  }
}
