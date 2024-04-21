import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositores/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;

let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("Should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near gym",
      description: null,
      latitude: -23.5936217,
      longitude: -46.7223046,
      phone: null,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      latitude: -23.9936217,
      longitude: -46.9223046,
      phone: null,
    });

    const { gyms } = await sut.handler({
      userLatitude: -23.5936217,
      userLongitude: -46.7223046,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near gym" })]);
  });
});
