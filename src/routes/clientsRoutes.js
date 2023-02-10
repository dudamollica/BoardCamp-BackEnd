import {
  showClients,
  showEspecificClient,
  insertClient,
  updateClients,
} from "../controller/clientsController.js";
import { Router } from "express";
import { validateSchema } from "../middleware/validateSchema.js";
import { clientsSchema } from "../schemas/clientsSchema.js";

const clientsRouter = Router();

clientsRouter.get("/customers", showClients);
clientsRouter.get("/customers/:id", showEspecificClient);
clientsRouter.post("/customers", validateSchema(clientsSchema), insertClient);
clientsRouter.put("/customers/:id", updateClients);

export default clientsRouter;
