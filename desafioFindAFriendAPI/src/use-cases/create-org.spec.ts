import { expect, describe, it, beforeEach } from "vitest"
import { CreateOrgUseCase } from "./create-org";
import { InMemoryOrgsRepostitory } from "@/repositores/in-memory/in-memory-orgs-repository";
import { randomUUID } from "crypto";


let usersRepository: InMemoryOrgsRepostitory;
let sut: CreateOrgUseCase;


beforeEach(() => {
    usersRepository = new InMemoryOrgsRepostitory();
    sut = new CreateOrgUseCase(usersRepository);
})

describe("Register Use Case", () => {
    it("Shold be to to register ", async () => {
        const { org } = await sut.handler({
            name: "Org Name",
            andress: "New Andress",
            password: "1234",
            phone: "751231"
        });

        expect(org.id).toEqual(expect.any(String))
    })
})