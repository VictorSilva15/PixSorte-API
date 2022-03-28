import { Entity } from "../../core/domain/Entity";

export type CardProps = {
  id: string;
  unit_price: number;
  values_sorted: Array<number>;
  client: string;
  created_at: Date;
};

export class Card extends Entity<CardProps> {
  // private constructor isn't instantiated from external
  private constructor(props: CardProps) {
    super(props);
  }

  // Static because the method need to be called without instantiate the class
  static create(Props: CardProps) {
    const card = new Card(Props);

    return card;
  }
}
