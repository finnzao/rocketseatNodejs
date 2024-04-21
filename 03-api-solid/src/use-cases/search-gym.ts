import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositores/gyms-repository";

interface SearchGymsUseCaseRequest {
  query: string;
  page: number;
}
interface SearchGymsUseCaseReponse {
  gyms: Gym[];
}
export class SearchGymUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async handler({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseReponse> {
    const gyms = await this.gymRepository.searchManyByTitle(query, page);

    return {
      gyms,
    };
  }
}
