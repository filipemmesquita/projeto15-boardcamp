import { Router } from "express";
import { getRentals,addRentals, endRental } from "../controllers/rentalsController.js";
import validateRental from "../middlewares/rentalsValidation.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals",validateRental,addRentals )
rentalsRouter.post("/rentals/:id/return",endRental )
rentalsRouter.get("/rentals", getRentals);

export default rentalsRouter;