import { PrismaGymsRepository } from "@/repositores/prisma/prisma-gyms-repositore";
import { CreateGymUseCase } from "../create-gym";

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const userCase = new CreateGymUseCase(gymsRepository);

  return userCase;
}
