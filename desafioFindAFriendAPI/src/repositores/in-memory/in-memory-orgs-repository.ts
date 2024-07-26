import { Orgs, Prisma, Role } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepostitory implements OrgsRepository {

    public items: Orgs[] = [];

    async create(data: Prisma.OrgsUncheckedCreateInput) {

        if (!data.role) {
            data.role = "MEMBER"
        }

        const org = {
            id: randomUUID(),
            name: data.name,
            phone: data.phone,
            andress: data.andress,
            password_hash: data.password_hash,
            role: data.role
        };

        this.items.push(org); // Adiciona a nova organização ao array de items
        return org;
    }

    async findById(id: string) {
        const org = this.items.find((item) => item.id === id);

        if (!org) {
            return null
        }

        return org
    }
    async findByNumber(phone: string) {
        const org = this.items.find((item) => item.phone === phone)

        if (!org) {
            return null
        }

        return org
    }

    async searchManyByTitle(query: string, page: number) {
        const org = this.items
            .filter((item) => item.name.includes(query))
            .slice((page - 1), page * 20)

        return org
    }
}
