import { Prisma, Orgs } from "@prisma/client"

export interface OrgssRepository {
    create(data: Prisma.OrgsCreateInput): Promise<Orgs>;
    findById(id: string): Promise<Orgs | null>;
    searchManyByTitle(query: string, page: number): Promise<Orgs[]>;
}