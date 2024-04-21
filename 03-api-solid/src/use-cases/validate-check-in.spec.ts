import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInRepository } from "@/repositores/in-memory/in-memory-checkIn-repository";

import { ValidateCheckInUseCase } from "./validate-check-in";

let checkInsRepository: InMemoryCheckInRepository;

let sut: ValidateCheckInUseCase;

describe("Validate Check-In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    // vi.useFakeTimers();
  });

  afterEach(() => {
    // vi.useRealTimers();
  });

  it("Should be able to validate check-in", async () => {
    const checkIn = checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await sut.handler({
      checkInId: checkIn.id,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
});
