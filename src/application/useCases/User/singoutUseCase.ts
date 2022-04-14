import { UserRepository } from "../../repositories/IuserRepository";

export class SignoutUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(access_token: string) {
    const result = await this.userRepository.signOut(access_token);

    return result;
  }
}
