import { PrismaCheckInsRepository } from "@/repositores/prisma/prisma-check-ins-repositore";
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-in-history";

export function makeFetchUseCheckInsHistoryUseCase() {
  const prismaUsersRepository = new PrismaCheckInsRepository();
  const userCase = new FetchUserCheckInsHistoryUseCase(prismaUsersRepository);

  return userCase;
}
