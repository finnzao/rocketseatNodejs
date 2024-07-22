import { UsersRepository } from "@/repositores/users-repository";
import { User } from "@prisma/client";



interface GetPetProfileRequest {
    petId: string
}

interface GetPetProfileResponse {
    pet: User
}


export class GetPetProfileUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async handler({
        petId
    }: GetPetProfileRequest): Promise<GetPetProfileResponse> {

        const pet = await this.usersRepository.findById(petId)

        
        if (!pet) {
            throw new Error("Pet not found")
        }
        return {
            pet,
        }
    }
}
