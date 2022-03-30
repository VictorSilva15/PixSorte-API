import { CardRepository } from "../../repositories/IcardRepository";

export class DeleteCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  // Will delete the card
  async execute(card_id: string) {
    const result = await this.cardRepository.delete(card_id);

    return result;
  }
}
