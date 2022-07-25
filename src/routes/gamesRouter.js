import { Router } from "express";
import { addGame,getGames } from "../controllers/gamesController.js";
import validateGame from "../middlewares/gamesValidation.js"

const gameRouter = Router();

gameRouter.post("/games",validateGame, addGame);
gameRouter.get("/games", getGames);

export default gameRouter;