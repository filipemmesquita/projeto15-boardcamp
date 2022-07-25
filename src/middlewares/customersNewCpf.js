import { connection } from "../dbStrategy/database.js";
import joi from "joi";


export default async function checkIfNewCustomer(req, res, next) {
    const newCustomer=req.body;
    const {rows: games }=await connection.query(`
    SELECT cpf FROM customers WHERE cpf=$1
    `,[newCustomer.cpf]);
    if(games.length>0)
    {
        return res.sendStatus(409);
    }
    next();
}