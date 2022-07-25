import { connection } from "../dbStrategy/database";

export async function addCategory(req,res){
    const {newCategory}= req.body;
        
    try{
        await connection.query(`
        INSERT INTO categories (name) VALUES ($1)
        `, [newCategory.name])
        res.sendStatus(201)
    }
    catch
    {
        res,sendStatus(500);
    }
}
export async function getAllCategories(req,res){
    try{
        await connection.query(`
        SELECT * FROM categories
        `)
        res.sendStatus(201)
    }
    catch
    {
        res,sendStatus(500);
    }
}
