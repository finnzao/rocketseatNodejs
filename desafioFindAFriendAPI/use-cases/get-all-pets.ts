import { UsersRepository } from "@/repositores/users-repository";
import { User } from "@prisma/client";

interface GetAllUsersUseCaseRequest {
    page: number;
}
interface GetAllUsersUseCaseReponse {
    pets: User[];
}

export class GetAllUsersUseCase {
    constructor(private userRepository: UsersRepository) { }

    async handler({ page }: GetAllUsersUseCaseRequest): Promise<GetAllUsersUseCaseReponse> {
        const pets = await this.userRepository.getAll(page)
        return {
            pets,
        }
    }
}