import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";



export class InMemoryUsersRepostitory implements UsersRepository {

    public items: User[] = [];

    async create(data: Prisma.UserUncheckedCreateInput) {

        const pet = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            owner: data.owner,
            number: data.number,
            org_id: data.org_id
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


    async findByName(query: string, page: number) {
        return this.items
            .filter((item) => item.name.includes(query))
            .slice((page - 1) * 20, page * 20);
    }

    async getAll(page: number) {
        return this.items.slice((page - 1) * 20, page - 20)
    }
}