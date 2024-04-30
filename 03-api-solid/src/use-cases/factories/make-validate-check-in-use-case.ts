import { PrismaCheckInsRepository } from "@/repositores/prisma/prisma-check-ins-repositore";
import { ValidateCheckInUseCase } from "../validate-check-in";

export function makeValidateCheckInUseCase() {
  const prismaUsersRepository = new PrismaCheckInsRepository();
  const userCase = new ValidateCheckInUseCase(prismaUsersRepository);

  return userCase;
}
