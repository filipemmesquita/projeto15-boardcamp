import { Router } from "express";
import { getCustomers,getCustomersById,addCustomers } from "../controllers/customersController.js";
import validateCustomer from "../middlewares/customersValidation.js";

const customersRouter = Router();

customersRouter.post("/customers",validateCustomer,addCustomers);
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);


export default customersRouter;