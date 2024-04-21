import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInRepository } from "@/repositores/in-memory/in-memory-checkIn-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInRepository;

let sut: GetUserMetricsUseCase;

describe("Get user Metrics Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("Should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-03",
      user_id: "user-01",
    });

    const { checkInsCount } = await sut.handler({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(3);
  });
});
