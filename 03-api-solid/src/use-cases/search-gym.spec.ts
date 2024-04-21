import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositores/in-memory/in-memory-gyms-repository";
import { SearchGymUseCase } from "./search-gym";

let gymsRepository: InMemoryGymsRepository;

let sut: SearchGymUseCase;

describe("Search Gyms Use Case ", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymsRepository);
  });

  it("Should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "gym-01",
      description: null,
      latitude: -23.5936217,
      longitude: -46.7223046,
      phone: null,
    });

    await gymsRepository.create({
      title: "gym-02",
      description: null,
      latitude: -23.5936217,
      longitude: -46.7223046,
      phone: null,
    });

    const { gyms } = await sut.handler({
      query: "gym",
      page: 1,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "gym-01" }),
      expect.objectContaining({ title: "gym-02" }),
    ]);
  });

  it("Should be able to fetch pagination check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      gymsRepository.create({
        title: `gym-${i}`,
        description: null,
        latitude: -23.5936217,
        longitude: -46.7223046,
        phone: null,
      });
    }

    const { gyms } = await sut.handler({
      query: "gym",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "gym-21" }),
      expect.objectContaining({ title: "gym-22" }),
    ]);
  });
});
