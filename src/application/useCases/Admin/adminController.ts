// Entity
import { Admin } from "../../../domain/entities/admin";

// Types and Interfaces
import { AdminRepository } from "../../repositories/IadminRepository";

// Supabase Client
import { supabase } from "../../../utils/connect_db";

export class AdminController implements AdminRepository {
  
  // Login functionality
  async login(email: string, password:string): Promise<any> {

      // Code will here login
  }

  // Logout functionality
  async logout(): Promise<any> {

    // Code will here to logout
  }


}
