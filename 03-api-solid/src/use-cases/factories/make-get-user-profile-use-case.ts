import { PrismaUsersRepository } from "@/repositores/prisma/prisma-users-repositore";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const userCase = new GetUserProfileUseCase(prismaUsersRepository);

  return userCase;
}
