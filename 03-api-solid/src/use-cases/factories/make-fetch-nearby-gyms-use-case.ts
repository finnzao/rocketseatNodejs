import { PrismaGymsRepository } from "@/repositores/prisma/prisma-gyms-repositore";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const userCase = new FetchNearbyGymsUseCase(gymsRepository);

  return userCase;
}
