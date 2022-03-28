import { CardRepository } from "../../repositories/IcardRepository";

export class DeleteCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  // Will delete the card
  async execute(id: string) {
    const result = await this.cardRepository.delete(id);

    return result;
  }
}
