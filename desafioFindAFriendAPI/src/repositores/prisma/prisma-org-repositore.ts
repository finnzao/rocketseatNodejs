import { prisma } from "@/lib/prisma";
import { Orgs, Prisma } from "@prisma/client"

import { OrgsRepository } from "../orgs-repository";

export class PrismaOrgRepositore implements OrgsRepository {

    async create(data: Prisma.OrgsCreateInput) {
        const org = await prisma.orgs.create({
            data,
        });

        return org
    }
    async findById(id: string) {
        const orgId = await prisma.orgs.findUnique({
            where: { id }
        })

        return orgId
    }
    async searchManyByTitle(query: string, page: number) {
        const orgs = await prisma.orgs.findMany({
            where: {
                name: query
            },
            take: 20,
            skip: (page - 1) * 20
        })
        return orgs
    }
    async findByNumber(phone: string) {
        const org = await prisma.orgs.findUnique({
            where: {
                phone
            }
        })

        return org
    }


}