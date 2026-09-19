import { db } from "../src/prisma/db.ts";

export async function createService(req, res){
    const user = req.user;
    const {category, description} = req.body;
    try {
        const newService = await db.orm.public.Service.create({
            providerId: user.id,
            category: category,
            description: description,
            reviews_values: 0,
            total_reviews: 0
        });
        res.status(201).json({
            "message": "Created Successfully",
            "data": newService
        })
    } catch (error) {
        console.error('Error creating provider:', error);
        res.status(400).json({
            "message": "Something went wrong.",
            "error": error
        })
    }
}

export async function updateService(req, res){
    const serviceId = req.id;
    const {description} = req.body;
    try{
        const service = await db.orm.public.Service.where({id: serviceId}).update(
            {
                description: description
            }
        )
        const updatedService = await db.orm.public.Service.where({id:serviceId}).first()
        res.status(200).json({
            "message": "Service Updated.",
            "data": updatedService
        })
    } catch (error) {
        console.error('Error creating provider:', error);
        res.status(400).json({
            "message": "Something went wrong.",
            "error": error
        })
    }
}

export async function getServices(req, res){
    console.log("Entered getServices");
    try{
        console.log("finding services");
        const services = await db.orm.public.Service.all();
        console.log("after services")
        return res.status(200).json({
            "msg": "Success",
            "data": services
        })
    } catch (error) {
        console.error('Error creating provider:', error);
        return res.status(400).json({
            "message": "Something went wrong.",
            "error": error
        })
    } 
}
