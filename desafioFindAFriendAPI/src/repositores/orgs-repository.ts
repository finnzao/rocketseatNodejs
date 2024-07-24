import { Prisma, Orgs } from "@prisma/client"

export interface OrgsRepository {
    create(data: Prisma.OrgsCreateInput): Promise<Orgs>;
    findById(id: string): Promise<Orgs | null>;
    searchManyByTitle(query: string, page: number): Promise<Orgs[]>;
    findByNumber(phone: string): Promise<Orgs | null>;
}