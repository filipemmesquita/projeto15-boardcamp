import { connection } from "../dbStrategy/database.js";

export async function addCustomers(req,res){
        
    try{
        const {name, phone,cpf,birthday}=req.body
        await connection.query(`
        INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)
        `, [name,phone,cpf,birthday])
        res.sendStatus(201)
    }
    catch(error)
    {
        console.log(error.message)
        res.sendStatus(500);
    }
}
export async function getCustomers(req,res){
    try{
        if(req.query.cpf){
            const { rows: customers } = await connection.query(`
            SELECT *
            FROM customers
            WHERE customers.cpf LIKE $1
            `,[req.query.cpf+"%"])
            res.send(customers)
        }
        else
        {
            const { rows: customers } = await connection.query(`
            SELECT *
            FROM customers
            `)
            res.send(customers)
        }
        
    }
    catch(error)
    {
        console.log(error.message)
        res.sendStatus(500);
    }
}
export async function getCustomersById(req,res){
    try
    {
        
            const { rows: clients } = await connection.query(`
            SELECT *
            FROM customers
            WHERE customers.id = $1
            `,[req.params.id])
            if(clients.length===0){
                return res.sendStatus(404);
            }
            res.send(clients)       
    }
    catch(error)
    {
        console.log(error.message)
        res.sendStatus(500);
    }
}

