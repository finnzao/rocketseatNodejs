import { UsersRepository } from "@/repositores/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { User } from "@prisma/client";

interface GetUserProfileRequest {
  userId: string;
}
interface GetUserProfileReponse {
  user: User;
}
export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async handler({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileReponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
