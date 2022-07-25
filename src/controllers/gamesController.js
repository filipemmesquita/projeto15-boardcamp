import { connection } from "../dbStrategy/database.js";

export async function addGame(req,res){
        
    try{
        const {name, image, stockTotal, categoryId, pricePerDay}=req.body
        await connection.query(`
        INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)
        `, [name,image,stockTotal,categoryId,pricePerDay])
        res.sendStatus(201)
    }
    catch(error)
    {
        console.log(error.message)
        res.sendStatus(500);
    }
}
export async function getGames(req,res){
    try{
        if(req.query.name.length>0){
            const { rows: games } = await connection.query(`
            SELECT games.*, categories.name as "categoryName"
            FROM games JOIN categories
            ON games."categoryId"=categories.id
            WHERE games.name LIKE $1
            `,[req.query.name+"%"])
            res.send(games)
        }
        else
        {
            const { rows: games } = await connection.query(`
            SELECT games.*, categories.name as "categoryName"
            FROM games JOIN categories
            ON games."categoryId"=categories.id
            `)
            res.send(games)
        }
        
    }
    catch(error)
    {
        console.log(error.message)
        res.sendStatus(500);
    }
}
