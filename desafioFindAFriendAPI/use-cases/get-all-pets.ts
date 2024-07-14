import { UsersRepository } from "@/repositores/users-repository";
import { User } from "@prisma/client";

interface GetAllUsersReponse {
    pets: User
}

export class GetAllUsersUseCase {
    constructor (private user)
}