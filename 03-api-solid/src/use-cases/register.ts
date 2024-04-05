import { UsersRepository } from "@/repositores/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-erro";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
interface RegisterUseCaseReponse {
  user: User;
}
export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async handler({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseReponse> {
    const password_hash = await hash(password, 6);

    const UserWithSameEmail = await this.userRepository.findByEmail(email);

    if (UserWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
