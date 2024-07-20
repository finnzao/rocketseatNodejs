import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client"

import { UsersRepository } from "../users-repository";

export class PrismaUsersRepositore implements UsersRepository {

    findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    findByName(params: string, page: number): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    getAll(page: number): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async create(data: Prisma.UserCreateInput) {

        const user = await prisma.user.create({
            data,
        })

        return user
    }
    
}