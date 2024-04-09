import { expect, describe, it, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryUsersRepository } from "@/repositores/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

beforeEach(() => {
  usersRepository = new InMemoryUsersRepository();
  sut = new AuthenticateUseCase(usersRepository);
});

describe("Authenticate Use Case", () => {
  it("Should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Marcos Doe",
      email: "emailteste4141@gmail.com",
      password_hash: await hash("123456", 6),
    });
    // sut: sistem under test
    const { user } = await sut.handler({
      email: "emailteste4141@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not be able to with wrong email", async () => {
    expect(() =>
      sut.handler({
        email: "john@example.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be able authenticate with wrong email", async () => {
    await usersRepository.create({
      name: "Marcos Doe",
      email: "emailteste4141@gmail.com",
      password_hash: await hash("123456", 6),
    });
    // sut: sistem under test

    expect(() =>
      sut.handler({
        email: "john@example.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
