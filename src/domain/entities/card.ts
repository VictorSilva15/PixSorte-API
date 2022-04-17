import { Entity } from "../../core/domain/Entity";

export type CardProps = {
  title: string;
  number_of_cards: number;
  unit_price: number;
  min: number;
  max: number;
  amount_random_number: number;
  values_sorted?: Array<number[]>;
  html: string | { error: any } | undefined;
  client_id: string;
  date_sort: Date;
};

export class Card extends Entity<CardProps> {
  // private constructor isn't instantiated from external
  private constructor(props: CardProps) {
    super(props);
  }

  // Static because the method need to be called without instantiate the class
  static create(Props: CardProps) {
    const card = new Card(Props);

    const result = { card_id: card.id, ...card.props };

    return result;
  }
}
