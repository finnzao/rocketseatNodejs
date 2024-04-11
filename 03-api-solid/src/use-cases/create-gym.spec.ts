import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import { InMemoryGymsRepository } from "@/repositores/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

beforeEach(() => {
  gymsRepository = new InMemoryGymsRepository();
  sut = new CreateGymUseCase(gymsRepository);
});
describe("Register Gym Case", () => {
  it("Should be able to register", async () => {
    const { gym } = await sut.handler({
      title: "gym one",
      description: null,
      latitude: -23.5936217,
      longitude: -46.7223046,
      phone: null,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
