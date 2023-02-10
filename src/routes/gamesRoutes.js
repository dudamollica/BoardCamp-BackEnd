import { showGames, insertGames } from "../controller/gamesController.js";
import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema.js";
import { gamesSchema } from "../schemas/gamesSchema.js";

const gamesRouter = Router();

gamesRouter.get("/games", showGames);
gamesRouter.post("/games", validateSchema(gamesSchema), insertGames);

export default gamesRouter;
