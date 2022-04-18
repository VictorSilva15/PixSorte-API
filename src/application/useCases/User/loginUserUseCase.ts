import { User, UserProps } from "../../../domain/entities/user";
import { UserRepository } from "../../repositories/IuserRepository";

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(props: UserProps) {
    const user = User.create(props);

    const result = await this.userRepository.login(user);

    return result;
  }
}
