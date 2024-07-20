import { PrismaUsersRepositore } from "@/repositores/prisma/prisma-pets-repositore"
import { GetAllUsersUseCase } from "../get-all-pets"


export function makeGetAllPetsUseCase() {
    const petsRepostiore = new PrismaUsersRepositore()
    const getAllUseCase = new GetAllUsersUseCase(petsRepostiore);

    return getAllUseCase;
}