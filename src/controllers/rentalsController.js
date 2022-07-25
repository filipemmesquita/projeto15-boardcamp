import { connection } from "../dbStrategy/database.js";
import dayjs from "dayjs";

export async function getRentals(req,res){
    try{
        if(req.query.customerId){
            const { rows: rentals } = await connection.query(`
            SELECT rentals.*,
            customers.name as "customerName",
            games.name as "gameName",
            games."categoryId",
            categories.name as "categoryName"
            FROM rentals 
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
            JOIN categories ON games."categoryId" = categories.id
            WHERE rentals.customerId = $1
            `,[req.query.customerId])
            res.send(rentals)
        }
        else if(req.query.gameId){
            const { rows: rentals } = await connection.query(`
            SELECT rentals.*,
            customers.name as "customerName",
            games.name as "gameName",
            games."categoryId",
            categories.name as "categoryName"
            FROM rentals 
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
            JOIN categories ON games."categoryId" = categories.id
            WHERE rentals.gameId = $1
            `,[req.query.gameId])
            res.send(rentals)
        }
        else
        {
            const { rows: rentals } = await connection.query(`
            SELECT rentals.*,
            customers.name as "customerName",
            games.name as "gameName",
            games."categoryId",
            categories.name as "categoryName"
            FROM rentals 
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
            JOIN categories ON games."categoryId" = categories.id
            `)
            res.send(rentals)
        }
        
    }
    catch(error)
    {
        console.log(error.message)
        res.sendStatus(500);
    }
}
export async function addRentals(req,res){
    try{
        const {customerId,gameId,daysRented}=req.body;
        const rentDate= dayjs().format('YYYY-MM-DD');
        const returnDate =null;
        const delayFee=null;
        const {rows: games}=await connection.query(`
        SELECT * FROM games 
        WHERE id = $1
        `, [gameId])


        const {rows: customer }=await connection.query(`
        SELECT * FROM customers WHERE id=$1
        `,[customerId]);
        if(customer.length===0||games.length===0||games.stockTotal<=0)
        {
            console.log(customer)
            console.log(games)
            console.log(games.stockTotal)
            return res.sendStatus(400);
        }
        const originalPrice=games[0].pricePerDay*daysRented;
        

        await connection.query(`
        INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate","originalPrice","delayFee") VALUES ($1, $2, $3, $4,$5,$6,$7)
        `, [customerId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee])
        res.sendStatus(201)
    }
    catch(error)
   {
        console.log(error.message)
        res.sendStatus(500);
    }

}
