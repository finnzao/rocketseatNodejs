import { PrismaCheckInsRepository } from "@/repositores/prisma/prisma-check-ins-repositore";
import { GetUserMetricsUseCase } from "../get-user-metrics";

export function makeGetUserMetricsUseCase() {
  const prismaUsersRepository = new PrismaCheckInsRepository();
  const userCase = new GetUserMetricsUseCase(prismaUsersRepository);

  return userCase;
}
