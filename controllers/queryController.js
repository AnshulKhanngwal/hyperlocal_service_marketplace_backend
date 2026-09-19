import { db } from "../src/prisma/db.ts";

export async function createQuery(req, res){
    const {description, name, email } = req.body;
    try {
        const newQuery = await db.orm.public.Queries.create({
            name: name,
            email: email,
            description: description
        });
        
        res.status(201).json({
            "message": "Created Successfully",
            "data": newQuery
        })
    } catch (error) {
        console.error('Error creating provider:', error);
        res.status(400).json({
            "message": "Something went wrong.",
            "error": error
        })
    }
}

export async function getQueries(req, res){
    console.log("Entered getServices");
    try{
        console.log("finding services");
        const queries = await db.orm.public.Queries.all();
        console.log("after notifications")
        return res.status(200).json({
            "msg": "Success",
            "data": queries
        })
    } catch (error) {
        console.error('Error creating provider:', error);
        return res.status(400).json({
            "message": "Something went wrong.",
            "error": error
        })
    } 
}
