import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInRepository } from "@/repositores/in-memory/in-memory-checkIn-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-in-history";

let checkInsRepository: InMemoryCheckInRepository;

let sut: FetchUserCheckInsHistoryUseCase;

describe("Fetch check-in history ", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
  });

  it("Should be able to fetch user checkin history", async () => {
    checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkIns } = await sut.handler({
      userId: "user-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });
  it("Should be able to fetch pagination check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await sut.handler({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
