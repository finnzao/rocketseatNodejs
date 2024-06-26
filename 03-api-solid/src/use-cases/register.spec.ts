import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositores/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-erro";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

beforeEach(() => {
  usersRepository = new InMemoryUsersRepository();
  sut = new RegisterUseCase(usersRepository);
});
describe("Register Use Case", () => {
  it("Should be able to register", async () => {
    const { user } = await sut.handler({
      name: "John doe",
      email: "emailteste4141@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should hash user passowrd upon registration", async () => {
    const { user } = await sut.handler({
      name: "John doe",

      email: "emailteste4141@gmail.com",

      password: "123456",
    });

    const isPasswordCorretlyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorretlyHashed).toBe(true);
  });

  it("Should not be able regisetr with same email twice", async () => {
    const email = "johndoe@example.com";

    await sut.handler({
      name: "John doe",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.handler({
        name: "John doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
