import { Router } from "express";
import { CardController } from "../application/useCases/Card/cardController";
import { GenerateCardUseCase } from "../application/useCases/Card/generateCardUsecase";
import { ReadCardUseCase } from "../application/useCases/Card/readCardUsecase";
import { DeleteCardUseCase } from "../application/useCases/Card/deleteCardUsecase";

// routes
const cardRoutes = Router();

// Card controller
const cardController = new CardController();

// POST
cardRoutes.post("/", async (req, res) => {
  const generateCard = new GenerateCardUseCase(cardController);

  try {
    const result = await createTeacher.execute(req.body);

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
    const result = await readTeacher.execute();
    return res.json({result: result})
  } catch (error: any) {
    return res.json({error: error})
  }
});

//DELETE TEACHER
cardRoutes.delete("/:id", async (req, res) => {
  const deleteCard = new DeleteCardUseCase(cardController);

  const { id } = req.params;

  try {
    const result = await deleteTeacher.execute(id);
    return res.json({result: result})
  } catch (error: any) {
    return res.json({error: error})
  }
});

export { cardRoutes };
