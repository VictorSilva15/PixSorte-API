import { AdminRepository } from "../../repositories/IadminRepository";

export class LogoutAdminUseCase {
  constructor(private adminRepository: AdminRepository) {}

  // Will singout from the webapp
  async execute() {
    const result = await this.courseRepository.logout();

    return result;
  }
}
