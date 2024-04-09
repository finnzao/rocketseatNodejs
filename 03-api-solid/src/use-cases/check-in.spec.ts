import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInRepository } from "@/repositores/in-memory/in-memory-cehckIn-repository";
import { CheckinUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInRepository;
let sut: CheckinUseCase;

describe("Check-In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new CheckinUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it("Should be able to check in", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const { checkIn } = await sut.handler({
      gymdId: "gym-01",
      userId: "user-01",
    });
    console.log(checkIn.created_at);
    expect(checkIn.id).toEqual(expect.any(String));
  });
  it("Should not be able to check in twice in the same day", async () => {
    await sut.handler({
      gymdId: "gym-01",
      userId: "user-01",
    });

    await expect(() =>
      sut.handler({
        gymdId: "gym-01",
        userId: "user-01",
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it("Should  be able to check in twice in the same day but in different times", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.handler({
      gymdId: "gym-01",
      userId: "user-01",
    });
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
    await expect(() =>
      sut.handler({
        gymdId: "gym-01",
        userId: "user-01",
      }),
    ).rejects.toEqual(expect.any(String));
  });
});
