import { PrismaGymsRepository } from "@/repositores/prisma/prisma-gyms-repositore";
import { SearchGymUseCase } from "../search-gym";

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const userCase = new SearchGymUseCase(gymsRepository);

  return userCase;
}
