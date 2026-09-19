import { db } from "../src/prisma/db.ts";

export async function createNotification(req, res){
    const user = req.user;
    const {description, userId } = req.body;
    try {
        const newNotification = await db.orm.public.Notification.create({
            userId: userId,
            description: description
        });
        
        res.status(201).json({
            "message": "Created Successfully",
            "data": newNotification
        })
    } catch (error) {
        console.error('Error creating provider:', error);
        res.status(400).json({
            "message": "Something went wrong.",
            "error": error
        })
    }
}

export async function updateNotification(req, res){
    const notificationId = req.id;
    try{
         const notification = await db.orm.public.Notification
            .where({ id: notificationId })
            .first();

        if (!notification) {
            return res.status(404).json({
                message: "Booking not found."
            });
        }
        const updatedNotification = await db.orm.public.Notification.where({id: notificationId}).update(
            {
                seen: true
            }
        );
        // const updatedBooking = await db.orm.public.Service.where({id:bookingId}).first()
        res.status(200).json({
            "message": "Service Updated.",
            "data": updatedNotification
        })
    } catch (error) {
        console.error('Error creating provider:', error);
        res.status(400).json({
            "message": "Something went wrong.",
            "error": error
        })
    }
}

export async function getNotifications(req, res){
    console.log("Entered getServices");
    try{
        console.log("finding services");
        const notifications = await db.orm.public.Notification.all();
        console.log("after notifications")
        return res.status(200).json({
            "msg": "Success",
            "data": notifications
        })
    } catch (error) {
        console.error('Error creating provider:', error);
        return res.status(400).json({
            "message": "Something went wrong.",
            "error": error
        })
    } 
}
