// Entity
import { Card } from "../../../domain/entities/card";

// Types and Interfaces
import { CardRepository } from "../../repositories/IcardRepository";

// Supabase client
import { supabase } from "../../../utils/connect_db";

export class CardController implements CardRepository {
  // Save functionality
  async generate(card: Card): Promise<any> {

    // Generate card here

  }

  // Read functionality
  async read(): Promise<any> {

    // read card here

  }

  // delete functionality
  async delete(id: string): Promise<any> {

    // delete card here
    
  }
}
