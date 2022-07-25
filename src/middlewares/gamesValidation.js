import { connection } from "../dbStrategy/database.js";
import joi from "joi";


export default async function validateGame(req, res, next) {
    
    const gameSchema=joi.object({
        name: joi.string().min(3).required(),
        stockTotal:joi.number().min(0).required(),
        pricePerDay:joi.number().min(0).required(),
        categoryId:joi.required(),
        image: joi.string().pattern(/(https?:\/\/.*\.(?:png|jpg))/).required()
     });
    const newGame=req.body;
    const validate=gameSchema.validate(newGame);
    //check if category exists
    const { rows: category }=await connection.query(`
    SELECT id FROM categories WHERE id=$1
    `, [newGame.categoryId]);

    if(validate.error){
        console.log(validate)
        
        return res.sendStatus(400);
    };
    
    if(category.length===0){
        console.log("category")
        return res.sendStatus(400);
    }

    //check if new
    const {rows: games }=await connection.query(`
    SELECT id FROM games WHERE name=$1
    `,[newGame.name]);
    if(games.length>0)
    {
        return res.sendStatus(409);
    }
    next();
  }
  
  