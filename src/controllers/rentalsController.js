import { connection } from "../dbStrategy/database.js";
import dayjs from "dayjs";

export async function getRentals(req,res){
    try{
        let passRentals
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
            passRentals=rentals;
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
            passRentals=rentals;
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
            passRentals=rentals;
        }
        console.log(passRentals);
        const returnObject = passRentals.map(rental=>{
            rental={...rental,
            customer:{
                id:rental.customerId,
                name:rental.customerName,
                },
            game:{
                id:rental.gameId,
                name:rental.gameName,
                categoryId:rental.categoryId,
                categoryName:rental.categoryName,
                }
            }
            delete rental.customerName;
            delete rental.gameName;
            delete rental.categoryId;
            delete rental.categoryName;
            return rental;
        });
        
        res.send(returnObject);
    }
    catch(error)
    {
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
export async function endRental(req,res){
    try{
        const rentalId=req.params.id;
        console.log(".1")
        const { rows: rental } = await connection.query(`
            SELECT * FROM rentals 
            WHERE id = $1
            `,[rentalId]);
        if (rental[0].returnDate !== null) {
            return res.sendStatus(400);
        }
        console.log(".2")
        if (rental.length===0) {
            return res.sendStatus(404);
        }
        console.log(".3")

        let delayFee = null;
        const rentDate = new Date(rental[0].rentDate);
        const returnDate = dayjs(new Date(), "YYYY-MM-DD");
        const daysRented = rental[0].daysRented;
        const pricePerDay = rental[0].originalPrice / rental[0].daysRented;
        const delay = Math.abs(returnDate - rentDate);
        const delayInDays = Math.ceil(delay/(1000*60*60*24));
        const delayDays = delayInDays - daysRented;
        
        console.log(".4")

        if(delayDays>0){
            delayFee = delayDays *pricePerDay;
        }
        console.log(".5")
        
        await connection.query(`
            UPDATE rentals
            SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3
        `,[returnDate,delayFee,rentalId]);

        console.log(".6")

        res.sendStatus(200);
        

    }
    catch{
        res.sendStatus(500);
    }
}
export async function deleteRentals(req,res){
    try{
        const rentalId=req.params.id;
        const { rows: rentals } = await connection.query(`
        SELECT * FROM rentals WHERE id=$1
        `, [rentalId])

        if(rentals.length<1){
            return res.sendStatus(404);
        }

        if(rentals[0].returnDate!==null){
            return res.sendStatus(400);
        }

        await connection.query(`
        DELETE FROM rentals WHERE id=$1
        `, [rentalId])
        res.sendStatus(201)
    }
    catch{
        res.sendStatus(500)
    }
}
