import { expect, describe, it, beforeEach } from "vitest"
import { GetAllUsersUseCase } from "./get-all-pets";
import { InMemoryUsersRepostitory } from "@/repositores/in-memory/in-memory-users-repository";
import { randomUUID } from "crypto";

let userRepository: InMemoryUsersRepostitory;
let sut: GetAllUsersUseCase;


beforeEach(() => {
    userRepository = new InMemoryUsersRepostitory();
    sut = new GetAllUsersUseCase(userRepository)
})

describe("Get All Use Use Case", () => {
    it("Shold be to see all the pets", async () => {
        for (let index = 1; index < 24; index++) {
            await userRepository.create({
                email: `emailteste${index}@gmail.com`,
                name: `Name${index}`,
                number: `8199${index}34-0295`,
                owner: `Andre ${index}`,
                id: `pet-id-${index}`,
                org_id: randomUUID()
            })
        }


        const { pets } = await sut.handler({
            page: 1
        })

        expect(pets).toHaveLength(4); // Isso será a quantidade paginas 

    })
})