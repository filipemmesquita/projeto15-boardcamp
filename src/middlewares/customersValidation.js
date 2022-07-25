import { connection } from "../dbStrategy/database.js";
import joi from "joi";


export default async function validateCustomer(req, res, next) {
    
    const gameSchema=joi.object({
        name: joi.string().min(2).required(),
        phone:joi.string().pattern(/[0-9]{10,11}/).required(),
        cpf:joi.string().pattern(/[0-9]{11}/).required(),
        birthday:joi.date().required()
     });
    const newCustomer=req.body;
    const validate=gameSchema.validate(newCustomer);
    //check if new cpf
    const {rows: games }=await connection.query(`
    SELECT cpf FROM customers WHERE cpf=$1
    `,[newCustomer.cpf]);
    if(games.length>0)
    {
        return res.sendStatus(409);
    }
    next();
  }
  
  