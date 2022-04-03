import { Router } from "express";
import { CardController } from "../application/useCases/Card/cardController";
import { GenerateCardUseCase } from "../application/useCases/Card/generateCardUseCase";
import { ReadCardUseCase } from "../application/useCases/Card/readCardUseCase";
import { UpdateStatusCardUseCase } from "../application/useCases/Card/updateStatusCardUseCase";
import { DeleteCardUseCase } from "../application/useCases/Card/deleteCardUseCase";
import { generateValidation, updateValidation } from "../utils/validation";
// routes
const cardRoutes = Router();

// Card controller
const cardController = new CardController();

// POST
cardRoutes.post("/generate", async (req, res) => {
  const generateCard = new GenerateCardUseCase(cardController);

  try {
    // Validating the Data before proceduring with the logic code.
    await generateValidation(req.body);

    // The number of cards * amount of random number must be less than the max - min result
    if (
      +req.body.amount_random_number * +req.body.number_of_cards >
      +req.body.max - +req.body.min
    ) {
      return res
        .status(400)
        .send(
          "The range of numbers and amount of card doesn't match. The max - min must be lower than number of card to generate"
        );
    }

    const { data, error } = await generateCard.execute(req.body);

    if (error) return res.status(400).send(error);

    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
});

// GET ALL Cards
cardRoutes.get("/", async (req, res) => {
  const readCards = new ReadCardUseCase(cardController);

  let user_uuid = req.header("user-uuid");

  try {
    const { data, error } = await readCards.execute(user_uuid || "");

    if (error) return res.status(400).send(error);

    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
});

// UPDATE Status Card
cardRoutes.put("/update/:card_id", async (req, res) => {
  const updateStatusCard = new UpdateStatusCardUseCase(cardController);

  const { card_id } = req.params;

  try {
    await updateValidation(req.body);

    let updated_data, updated_error;

    if (!req.body.value_sorted) {
      const { data, error } = await updateStatusCard.execute(
        card_id,
        req.body.new_status
      );

      updated_data = data;
      updated_error = error;
    } else {
      const { data, error } = await updateStatusCard.execute(
        card_id,
        req.body.new_status,
        req.body.value_sorted
      );

      updated_data = data;
      updated_error = error;
    }

    if (updated_error) return res.status(400).send(updated_error);

    return res.status(200).send(updated_data);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
});

//DELETE CARD
cardRoutes.delete("/delete/:card_id", async (req, res) => {
  const deleteCard = new DeleteCardUseCase(cardController);

  const { card_id } = req.params;

  try {
    const { data, error } = await deleteCard.execute(card_id);

    if (error) return res.status(400).send(error);

    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
});

export { cardRoutes };
