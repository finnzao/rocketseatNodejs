import { PrismaUsersRepositore } from "@/repositores/prisma/prisma-users-repositore"
import { GetAllUsersUseCase } from "../get-all-pets"


export function makeGetAllPetsUseCase() {
    const petsRepostiore = new PrismaUsersRepositore()
    const userCase = new GetAllUsersUseCase(petsRepostiore);
}