import { Orgs } from "@prisma/client";
import { OrgssRepository } from "@/repositores/orgs-repository";

interface CreateOrgUseCaseRequest {
    name: string;
    andress: string;
    phone: string;
}
interface CreateOrgUseCaseReponse {
    org: Orgs;
}
export class CreateGymUseCase {
    constructor(private orgsRepository: OrgssRepository) { }

    async handler({
        name,
        andress,
        phone
    }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseReponse> {
        const org = await this.orgsRepository.create({
            name,
            andress,
            phone
        });

        return {
            org,
        };
    }
}
