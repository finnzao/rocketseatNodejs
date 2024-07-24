import { Orgs } from "@prisma/client";
import { OrgsRepository } from "@/repositores/orgs-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-erro";


interface CreateOrgUseCaseRequest {
    name: string;
    andress: string;
    phone: string;
    password: string
}
interface CreateOrgUseCaseReponse {
    org: Orgs;
}
export class CreateOrgUseCase {
    constructor(private orgsRepository: OrgsRepository) { }

    async handler({
        name,
        andress,
        phone,
        password
    }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseReponse> {
        const password_hash = await hash(password, 6)

        const orgWithSameNumber = await this.orgsRepository.findByNumber(phone)
        if (orgWithSameNumber) {
            throw new UserAlreadyExistsError
        }
        const org = await this.orgsRepository.create({
            name,
            andress,
            phone,
            password_hash,
        });

        return {
            org,
        };
    }
}
