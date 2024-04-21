import { expect, describe, it, beforeEach, afterEach } from "vitest";
import { InMemoryCheckInRepository } from "@/repositores/in-memory/in-memory-checkIn-repository";

import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

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
});
