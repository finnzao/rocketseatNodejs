import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositores/gym-repository";

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}
interface CreateGymUseCaseReponse {
  gym: Gym;
}
export class CreateGymUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async handler({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseReponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return {
      gym,
    };
  }
}
