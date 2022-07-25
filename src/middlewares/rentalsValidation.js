import { connection } from "../dbStrategy/database.js";
import joi from "joi";

export default async function validateRental(req, res, next) {
    const rentalSchema=joi.object({
        customerId: joi.required(),
        gameId:joi.required(),
        daysRented:joi.number().min(1).required()
    });
    const newRental=req.body;
    const validate=rentalSchema.validate(newRental);
    if(validate.error){
        console.log(validate)
        return res.sendStatus(400);
    };
    
    next();
  }
  
  