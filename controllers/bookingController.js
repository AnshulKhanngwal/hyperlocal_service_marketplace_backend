import { generateNotification } from "../services/NotificationService.js";
import { db } from "../src/prisma/db.ts";

export async function createBooking(req, res){
    const user = req.user;
    const {serviceId, userId, providerId, customerNote, ProviderNote } = req.body;
    if(user.role === "SERVICE_PROVIDER"){
        res.status(400).json({
            "message": "Provider can not create Bookings.",
            "data": []
        })
    }
    try {
        const newBooking = await db.orm.public.Booking.create({
            userId: userId,
            serviceId: serviceId,
            providerId: providerId,
            customerNote: customerNote,
            providerNote: ProviderNote,
            bookingDate: new Date().toISOString()
        });
        generateNotification(user.id, "New Booking")
        generateNotification(providerId, "New Booking")
        res.status(201).json({
            "message": "Created Successfully",
            "data": newBooking
        })
    } catch (error) {
        console.error('Error creating provider:', error);
        res.status(400).json({
            "message": "Something went wrong.",
            "error": error
        })
    }
}

export async function updateBooking(req, res){
    const bookingId = req.id;
    const {status, customerNote, providerNote} = req.body;
    try{
         const booking = await db.orm.public.Booking
            .where({ id: bookingId })
            .first();

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found."
            });
        }
        const updatedbooking = await db.orm.public.Booking.where({id: bookingId}).update(
            {
                status: status,
                customerNote: customerNote ?? booking.customerNote,
                providerNote: providerNote ?? booking.providerNote
            }
        );
        // const updatedBooking = await db.orm.public.Service.where({id:bookingId}).first()
        res.status(200).json({
            "message": "Service Updated.",
            "data": updatedbooking
        })
    } catch (error) {
        console.error('Error creating provider:', error);
        res.status(400).json({
            "message": "Something went wrong.",
            "error": error
        })
    }
}

export async function getBookings(req, res){
    const user = req.user;
    const {category} = req.query;
    let data;
    try{
        console.log("finding services");
        if(user.role == "ADMIN"){
                data = await db.orm.public.Booking.include("user").include("service").include("provider").all();
        }else if(user.role == "CUSTOMER"){
                data = await db.orm.public.Booking.include("user").include("service").include("provider").where({userId: user.id}).all();
        }else{
            data = await db.orm.public.Booking.include("user").include("service").include("provider").where({providerId: user.id}).all();
        }
        console.log("after data", data)
        return res.status(200).json({
            "msg": "Success",
            "data": data
        })
    } catch (error) {
        console.error('Error creating provider:', error);
        return res.status(400).json({
            "message": "Something went wrong.",
            "error": error
        })
    } 
}
