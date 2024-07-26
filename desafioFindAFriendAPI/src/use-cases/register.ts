import { UsersRepository } from "@/repositores/users-repository";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
    name: string;
    owner: string;
    number: string;
    email: string;
    org_id: string;
}

interface RegisterUseCaseReponse {
    pet: User;
}

export class RegisterUseCase {
    constructor(private userRepository: UsersRepository) { }

    async handler({
        name,
        owner,
        number,
        email,
        org_id

    }: RegisterUseCaseRequest): Promise<RegisterUseCaseReponse> {
        const userWithSameEmail = await this.userRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error("Email já existe")
        }
        const pet = await this.userRepository.create({
            name,
            owner,
            number,
            email,
            org_id,

        })


        return { pet }
    }
}