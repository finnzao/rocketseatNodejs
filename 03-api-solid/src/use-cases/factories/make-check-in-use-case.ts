import { PrismaCheckInsRepository } from "@/repositores/prisma/prisma-check-ins-repositore";
import { CheckinUseCase } from "../check-in";
import { PrismaGymsRepository } from "@/repositores/prisma/prisma-gyms-repositore";

export function makeCheckInUseCase() {
  const prismaUsersRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const userCase = new CheckinUseCase(prismaUsersRepository, gymsRepository);

  return userCase;
}
