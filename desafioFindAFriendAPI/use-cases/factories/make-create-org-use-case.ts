import { PrismaUsersRepositore } from "@/repositores/prisma/prisma-pets-repositore";
import { RegisterUseCase } from "../create-org";

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepositore();
  const registerUseCase = new RegisterUseCase(prismaUsersRepository);

  return registerUseCase;
}
