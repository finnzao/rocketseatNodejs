import { expect, describe, it, beforeEach } from "vitest"
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepostitory } from "@/repositores/in-memory/in-memory-users-repository";


let usersRepository: InMemoryUsersRepostitory;
let sut: RegisterUseCase;


beforeEach(() => {
    usersRepository = new InMemoryUsersRepostitory();
    sut = new RegisterUseCase(usersRepository);
})

describe("Register Use Case", () => {
    it("Shold be to to register ", async () => {
        const { pet } = await sut.handler({
            email: "emailteste@gmail.com",
            name: "Spike",
            number: "759913131",
            owner: "Peter Jordan"
        });

        expect(pet.id).toEqual(expect.any(String))
    })
})