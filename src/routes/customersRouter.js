import { Router } from "express";
import { getCustomers,getCustomersById,addCustomers,updateCustomers } from "../controllers/customersController.js";
import validateCustomer from "../middlewares/customersValidation.js";
import checkIfNewCustomer from "../middlewares/customersNewCpf.js";

const customersRouter = Router();

customersRouter.post("/customers",validateCustomer,checkIfNewCustomer,addCustomers);
customersRouter.put("/customers/:id",validateCustomer,updateCustomers);
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);


export default customersRouter;