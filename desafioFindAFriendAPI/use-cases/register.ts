import { UsersRepository } from "@/repositores/users-repository";
import { hash } from "bcryptjs";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
    name: string;
    owner: string;
    number: string;
    email: string;
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
        email
    }: RegisterUseCaseRequest): Promise<RegisterUseCaseReponse> {
        const userWithSameEmail = await this.userRepository.findByEmail(email)

        if(userWithSameEmail){
            throw new Error("Email já existe")
        }
        const pet = await this.userRepository.create({
            name,
            owner,
            number,
            email
        })


        return { pet }
    }
}