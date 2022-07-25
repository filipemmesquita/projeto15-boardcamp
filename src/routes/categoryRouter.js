import { Router } from "express";
import { addCategory, getAllCategories } from "../controllers/categoryController.js";
import validateCategory from "../middlewares/categoryValidation.js";

const categoryRouter = Router();

categoryRouter.post("/categories",validateCategory, addCategory);
categoryRouter.get("/categories", getAllCategories);

export default categoryRouter;