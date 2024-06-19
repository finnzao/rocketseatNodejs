import { PrismaUsersRepository } from "@/repositores/prisma/prisma-users-repositore";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(prismaUsersRepository);

  return registerUseCase;
}
