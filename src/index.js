import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import categoryRouter from './routes/categoryRouter.js';
import gamesRouter from './routes/gamesRouter.js'
import customersRouter from './routes/customersRouter.js'
import rentalsRouter from "./routes/rentalsRouter.js";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

server.use(categoryRouter);
server.use(gamesRouter)
server.use(customersRouter)
server.use(rentalsRouter)


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log('Server Online'));
