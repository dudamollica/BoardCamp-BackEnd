import {
    showClients,
    showEspecificClient,
    insertClient,
    updateClients,
  } from "../controller/clientsController.js";
  import { Router } from "express";
  
  const clientsRouter = Router()
  
  clientsRouter.get("/customers",showClients)
  clientsRouter.get("/customers/:id",showEspecificClient)
  clientsRouter.post("/customers",insertClient)
  clientsRouter.put("/customers/:id",updateClients)
  
  export default clientsRouter;