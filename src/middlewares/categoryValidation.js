import { connection } from "../dbStrategy/database.js";
import joi from "joi";

export default async function validateCategory(req, res, next) {
    const categorySchema=joi.object({
        name: joi.string().min(3).required()
    });
    const newCategory=req.body;
    const validate=categorySchema.validate(newCategory);
    if(validate.error){
        return res.sendStatus(400);
    };
    
    //check if new
    const {rows: categories }=await connection.query(`
    SELECT name FROM categories WHERE name=$1
    `,[newCategory.name]);
    if(categories.length>0)
    {
        return res.sendStatus(409);
    }
    next();
  }
  
  