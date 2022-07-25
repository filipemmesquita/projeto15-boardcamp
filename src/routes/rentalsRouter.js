import { Router } from "express";
import { getRentals,addRentals } from "../controllers/rentalsController.js";
import validateRental from "../middlewares/rentalsValidation.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals",validateRental,addRentals )
rentalsRouter.get("/rentals", getRentals);

export default rentalsRouter;