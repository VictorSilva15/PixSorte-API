// Entity
import { CardProps } from "../../../domain/entities/card";

// Types and Interfaces
import { CardRepository } from "../../repositories/IcardRepository";

// Supabase client
import { supabase } from "../../../utils/connect_db";

import { generateRandomCardsNumber } from "../../../utils/randomNumberGenerator";

export class CardController implements CardRepository {
  // Save functionality
  async generate(card: CardProps): Promise<any> {
    const randomCardsNumber = generateRandomCardsNumber(card);

    card.values_sorted = randomCardsNumber;

    console.log("cards completed: ", card);

    // Generate card here
    const result = await supabase.from("cards").insert([card]);

    console.log(result);

    return result;
  }

  // Read functionality
  async read(user_uuid: string): Promise<any> {
    // read card here
    const result = await supabase
      .from("cards")
      .select("*")
      .eq("client_id", user_uuid);

    return result;
  }

  // delete functionality
  async delete(card_id: string): Promise<any> {
    // delete card here
    const result = await supabase
      .from("cards")
      .delete()
      .match({ card_id: card_id });

    return result;
  }
}
