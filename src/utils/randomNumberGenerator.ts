type generateRandomCardsNumberProps = {
  number_of_cards: number;
  min: number;
  max: number;
  amount_random_number: number;
};

function generateRandomCardsNumber({
  min,
  max,
  number_of_cards,
  amount_random_number,
}: generateRandomCardsNumberProps): Array<number[]> {
  let cards = [];

  for (let i = 0; i < number_of_cards; i++) {
    let new_card = [];

    for (let j = 0; j < amount_random_number; j++) {
      let random_number = Math.floor(Math.random() * (max - min + 1)) + min;

      let alreadyExists = cards.some((card) => card.includes(random_number));

      if (!alreadyExists) {
        new_card.push(random_number);
      } else {
        j -= 1;
      }
    }
    cards.push(new_card);
  }

  return cards;
}

export { generateRandomCardsNumber };
