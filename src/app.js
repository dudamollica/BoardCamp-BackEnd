import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gamesRouter from "./routes/gamesRoutes.js";
import clientsRouter from "./routes/clientsRoutes.js";
import rentsRouter from "./routes/rentsRoutes.js";

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());
server.use([gamesRouter, clientsRouter, rentsRouter]);

server.listen(5000, () => console.log("servidor funfou"));
