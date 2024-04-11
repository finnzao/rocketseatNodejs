import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInRepository } from "@/repositores/in-memory/in-memory-checkIn-repository";
import { InMemoryGymsRepository } from "@/repositores/in-memory/in-memory-gyms-repository";
import { CheckinUseCase } from "./check-in";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInError } from "./errors/max-number-of-check-in";
import { MaxDistanceError } from "./errors/max-distance-error";

let checkInsRepository: InMemoryCheckInRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckinUseCase;

describe("Check-In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckinUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "IronBerg",
      description: "Descripiton ",
      phone: "666-666",
      latitude: -23.5936217,
      longitude: -46.7223046,
    });
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
      userLatitude: -23.5936217,
      userLongitude: -46.7223046,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });
  it("Should not be able to check in twice in the same day", async () => {
    await sut.handler({
      gymdId: "gym-01",
      userId: "user-01",
      userLatitude: -23.5936217,
      userLongitude: -46.7223046,
    });

    await expect(() =>
      sut.handler({
        gymdId: "gym-01",
        userId: "user-01",
        userLatitude: -23.5936217,
        userLongitude: -46.7223046,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInError);
  });

  it("Should  be able to check in twice in the same day but in different times", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.handler({
      gymdId: "gym-01",
      userId: "user-01",
      userLatitude: -23.5936217,
      userLongitude: -46.7223046,
    });
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.handler({
      gymdId: "gym-01",
      userId: "user-01",
      userLatitude: -23.5936217,
      userLongitude: -46.7223046,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Should  not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "New Gym",
      description: "Descripiton Gym ",
      phone: "666-666",
      latitude: new Decimal(-23.5936217),
      longitude: new Decimal(-46.7223046),
    });
    // -22.9699339,-45.8274342,15z
    expect(() =>
      sut.handler({
        gymdId: "gym-01",
        userId: "user-01",
        userLatitude: -22.9699339,
        userLongitude: -45.8274342,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
