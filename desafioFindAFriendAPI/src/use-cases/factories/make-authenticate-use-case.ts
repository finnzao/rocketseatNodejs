import { PrismaOrgRepositore } from "@/repositores/prisma/prisma-org-repositore";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  const prismaOrgsRepository = new PrismaOrgRepositore();
  const authenticateUseCase = new AuthenticateUseCase(prismaOrgsRepository);

  return authenticateUseCase;
}
