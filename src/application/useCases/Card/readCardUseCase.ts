import { CardRepository } from "../../repositories/IcardRepository";

export class ReadCardUseCase {
  constructor(private cardRepository: CardRepository) {}

  // Will read the card
  async execute(user_uuid: string) {
    const result = await this.cardRepository.read(user_uuid);

    return result;
  }
}
