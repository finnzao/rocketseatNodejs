import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositores/checkIn-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

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
    checkIn.validated_at = new Date();

    await this.checkInRepository.save(checkIn);
    return { checkIn };
  }
}
