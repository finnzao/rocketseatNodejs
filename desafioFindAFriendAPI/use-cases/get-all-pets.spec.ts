import { expect, describe, it, beforeEach } from "vitest"
import { GetAllUsersUseCase } from "./get-all-pets";
import { InMemoryUsersRepostitory } from "@/repositores/in-memory/in-memory-users-repository";

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
                id: `pet-id-${index}`
            })
        }


        const { pets } = await sut.handler({
            page: 1
        })
        console.log(pets)
        // Pets será a quantidade de paginas
        expect(pets).toHaveLength(4);

    })
})