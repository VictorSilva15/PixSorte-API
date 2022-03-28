import { CardRepository } from "../../repositories/IcardRepository";

export class ReadCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  // Will read the card
  async execute() {
    const result = await this.cardRepository.read();

    return result;
  }
}
