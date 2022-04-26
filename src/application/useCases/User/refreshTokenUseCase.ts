import { UserRepository } from "../../repositories/IuserRepository";

export class RefreshTokenUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(access_token: string) {
    const result = await this.userRepository.refreshToken(access_token);
    return result;
  }
}
