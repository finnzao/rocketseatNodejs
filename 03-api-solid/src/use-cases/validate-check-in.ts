import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositores/checkIn-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";
import dayjs from "dayjs";

interface ValidateCheckInRequest {
  checkInId: string;
}

interface ValidateCheckInResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async handler({
    checkInId,
  }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }
    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes",
    );
    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }
    checkIn.validated_at = new Date();

    await this.checkInRepository.save(checkIn);
    return {
      checkIn,
    };
  }
}
