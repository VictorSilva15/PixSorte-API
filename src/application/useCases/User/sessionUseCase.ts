import { UserRepository } from "../../repositories/IuserRepository";

export class SessionUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(access_token: string) {
    const result = await this.userRepository.session(access_token);

    return result;
  }
}
