import { Card, CardProps } from "../../../domain/entities/card";
import { CardRepository } from "../../repositories/IcardRepository";

export class GenerateCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  // Will create a new Card
  async execute(props: CardProps) {
    const card = Card.create({
      ...props,
    });

    const result = await this.cardRepository.generate(card);

    return result;
  }
}
