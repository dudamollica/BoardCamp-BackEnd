import {
    showRents,
    insertRent,
    finalizeRent,
    deleteRent,
  } from "../controller/rentsController.js";
  import { Router } from "express";
  
  const rentsRouter = Router();
  
  rentsRouter.get("/rentals", showRents);
  rentsRouter.post("/rentals", insertRent);
  rentsRouter.post("/rentals/:id/return", finalizeRent);
  rentsRouter.get("/rentals/:id", deleteRent);
  
  export default rentsRouter;
  