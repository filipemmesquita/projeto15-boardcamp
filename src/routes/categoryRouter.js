import { Router } from "express";
import { addCategory, getAllCategories } from "../controllers/categoryController";
import validateCategory from "../middlewares/categoryValidation";

const router = Router();

router.post("/categories", addCategory);
router.get("/categories",validateCategory, getAllCategories);

export default router