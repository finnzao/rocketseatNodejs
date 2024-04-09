import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";

import { InMemoryUsersRepository } from "@/repositores/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetUserProfileUseCase } from "./get-user-profile";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User ID Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });
  it("It should be Able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "Marcos Doe",
      email: "emailteste4141@gmail.com",
      password_hash: await hash("123456", 6),
    });
    // sut: sistem under test
    const { user } = await sut.handler({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("Marcos Doe");
  });
  it("Should not be able to Get user profile with wrong ID ", async () => {
    expect(() =>
      sut.handler({
        userId: "Invalid-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
