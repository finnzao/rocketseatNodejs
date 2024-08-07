import { Prisma, User } from "@prisma/client"

export interface UsersRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByName(query: string, page: number): Promise<User[]>;
    getAll(page: number): Promise<User[]>;
    create(data: Prisma.UserUncheckedCreateInput): Promise<User>
}