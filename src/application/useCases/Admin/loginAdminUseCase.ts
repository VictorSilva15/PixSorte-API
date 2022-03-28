import { AdminRepository } from "../../repositories/IadminRepository";

export class VerifyAdminUseCase {
  constructor(private adminRepository: AdminRepository) {}

  // Will Login into webapp
  async execute(email: string, password: string) {
    const result = await this.courseRepository.login(email, password);

    return result;
  }
}
