import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";



export class InMemoryUsersRepostitory implements UsersRepository {

    public items: User[] = [];

    async create(data: Prisma.UserCreateInput) {

        const pet = {
            id: "pet-01",
            name: data.name,
            email: data.email,
            owner: data.owner,
            number: data.number
        }

        this.items.push(pet)
        return pet
    }

    async findByEmail(email: string) {
        const searchEmail = this.items.find((item) => item.email === email)
        if (!searchEmail) {
            return null
        }

        return searchEmail
    }

    async findById(id: string) {
        const searchId = this.items.find((item) => item.id === id)

        if (!searchId) {
            return null
        }

        return searchId
    }


    async findByName(name: string): Promise<User | null> {
        const searchName = this.items.find((item) => item.name === name)

        if (!searchName) {
            return null
        }


        return searchName
    }
}