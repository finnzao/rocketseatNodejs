import { UsersRepository } from "@/repositores/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-erro";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async handler({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const sameWithSameEmail = await this.userRepository.findByEmail(email);

    if (sameWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.userRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
