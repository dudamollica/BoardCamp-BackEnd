import {showRents, insertRent, finalizeRent, deleteRent,} from "../controller/rentsController.js";
  import { Router } from "express";
  import { validateSchema } from "../middleware/validateSchema.js";
  import { rentsSchema } from "../schemas/rentsSchema.js";
  import validateClientGame from "../middleware/validateClientGame.js";
  import validateReturn from "../middleware/validateReturn.js";
  
  const rentsRouter = Router();
  
  rentsRouter.get("/rentals", showRents);
  rentsRouter.post("/rentals", validateSchema(rentsSchema), validateClientGame, insertRent);
  rentsRouter.post("/rentals/:id/return", validateReturn, finalizeRent);
  rentsRouter.delete("/rentals/:id", deleteRent);
  
  export default rentsRouter;
  