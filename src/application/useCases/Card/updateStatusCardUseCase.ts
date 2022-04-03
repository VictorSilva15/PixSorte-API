import { CardRepository } from "../../repositories/IcardRepository";

export class UpdateStatusCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  // Will delete the card
  async execute(card_id: string, new_status: string) {
    const result = await this.cardRepository.update(card_id, new_status);

    return result;
  }
}
