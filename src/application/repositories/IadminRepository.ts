import { Admin } from "../../domain/entities/admin"

export interface AdminRepository {
  login(email: string, password: string): Promise<Admin>; // For while I'll keep any signature
  logout(): Promise<any>;
}
