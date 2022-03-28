import { Router } from "express";
import { CardController } from "../application/useCases/Card/cardController";
import { GenerateCardUseCase } from "../application/useCases/Card/generateCardUseCase";
import { ReadCardUseCase } from "../application/useCases/Card/readCardUseCase";
import { DeleteCardUseCase } from "../application/useCases/Card/deleteCardUseCase";

// routes
const cardRoutes = Router();

// Card controller
const cardController = new CardController();

// POST
cardRoutes.post("/", async (req, res) => {
  const generateCard = new GenerateCardUseCase(cardController);

  try {
    const result = await generateCard.execute(req.body);

    return res.json({result: result})
  } catch (error: any) {
    console.log(error);
    return res.json({error: error})
  }
});

// GET ALL Cards
cardRoutes.get("/", async (_, res) => {
  const readCards = new ReadCardUseCase(cardController);

  try {
    const result = await readCards.execute();
    return res.json({result: result})
  } catch (error: any) {
    return res.json({error: error})
  }
});

//DELETE CARD
cardRoutes.delete("/:id", async (req, res) => {
  const deleteCard = new DeleteCardUseCase(cardController);

  const { id } = req.params;

  try {
    const result = await deleteCard.execute(id);
    return res.json({result: result})
  } catch (error: any) {
    return res.json({error: error})
  }
});

export { cardRoutes };
