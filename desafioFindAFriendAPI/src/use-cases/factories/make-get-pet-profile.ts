import { PrismaUsersRepositore } from "@/repositores/prisma/prisma-pets-repositore"
import { GetPetProfileUseCase } from "../get-pet-profile";

export function makeGetProfileProfileUseCase() {
  const prismaPetsRepository = new PrismaUsersRepositore();
  const userCase = new GetPetProfileUseCase(prismaPetsRepository);

  return userCase;
}
