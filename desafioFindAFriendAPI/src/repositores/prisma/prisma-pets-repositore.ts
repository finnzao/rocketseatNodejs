import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client"

import { UsersRepository } from "../users-repository";

export class PrismaUsersRepositore implements UsersRepository {

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },

        });

        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    async getAll(page: number = 1, pageSize: number = 20) {
        const users = await prisma.user.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        return users;
    }

    async findByName(params: string, page: number) {
        const user = await prisma.user.findMany({
            where: {
                name: {
                    contains: params,
                },
            }
        })
        return user;
    }



    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        })

        return user
    }
}