import { OrgsRepository } from "@/repositores/orgs-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { Orgs } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  number: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  orgs: Orgs;
}

export class AuthenticateUseCase {
  constructor(private OrgssRepository: OrgsRepository) { }

  async handler({
    number,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const orgs = await this.OrgssRepository.findByNumber(number);
    if (!orgs) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, orgs.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      orgs,
    };
  }
}
