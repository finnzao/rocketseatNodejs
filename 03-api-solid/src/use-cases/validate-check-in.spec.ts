import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import { InMemoryCheckInRepository } from "@/repositores/in-memory/in-memory-checkIn-repository";

import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let checkInsRepository: InMemoryCheckInRepository;

let sut: ValidateCheckInUseCase;

describe("Validate Check-In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should be able to validate check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.handler({
      checkInId: createdCheckIn.id,
    });
    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });

  it("Should not be able to validate an inexistent check-in", async () => {
    await expect(() =>
      sut.handler({
        checkInId: "Not exist",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("Should not be able to validate the check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    vi.advanceTimersByTime(1000 * 60 * 21); // 21 minutes in ms

    await expect(() => {
      sut.handler({
        checkInId: createdCheckIn.id,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
