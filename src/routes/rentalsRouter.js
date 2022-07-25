import { Router } from "express";
import { getRentals,addRentals, endRental, deleteRentals } from "../controllers/rentalsController.js";
import validateRental from "../middlewares/rentalsValidation.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals",validateRental,addRentals )
rentalsRouter.post("/rentals/:id/return",endRental )
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.delete("/rentals/:id", deleteRentals)


export default rentalsRouter;