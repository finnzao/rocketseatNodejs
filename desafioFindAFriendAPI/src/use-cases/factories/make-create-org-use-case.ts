import { PrismaOrgRepositore } from "@/repositores/prisma/prisma-org-repositore";
import { CreateOrgUseCase } from "../create-org";

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaOrgRepositore();
  const registerUseCase = new CreateOrgUseCase(prismaUsersRepository);

  return registerUseCase;
}
