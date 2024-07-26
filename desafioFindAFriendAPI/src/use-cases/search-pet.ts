import { UsersRepository } from "@/repositores/users-repository";
import { User } from "@prisma/client";



interface GetPetProfileRequest {
    query: string,
    page: number
}

interface GetPetProfileResponse {
    pet: User[]
}


export class GetPetProfileUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async handler({
        query,
        page
    }: GetPetProfileRequest): Promise<GetPetProfileResponse> {

        const pet = await this.usersRepository.findByName(query, page)

        return {
            pet,
        }
    }
}
