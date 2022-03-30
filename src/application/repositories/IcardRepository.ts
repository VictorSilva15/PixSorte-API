import { CardProps } from "../../domain/entities/card";

export interface CardRepository {
  generate(card: CardProps): Promise<any>;
  read(client_id: string): Promise<any>;
  delete(card_id: string): Promise<any>;
}
