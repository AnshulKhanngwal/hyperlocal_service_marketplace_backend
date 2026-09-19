import { db } from "../src/prisma/db.ts";

export async function createBooking(req, res){
    const user = req.user;
    const {serviceId, userId, providerId, customerNote, ProviderNote } = req.body;
    try {
        const newBooking = await db.orm.public.Booking.create({
            userId: userId,
            serviceId: serviceId,
            providerId: providerId,
            customerNote: customerNote,
            providerNote: ProviderNote,
            bookingDate: new Date().toISOString()
        });
        
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
    console.log("Entered getServices");
    try{
        console.log("finding services");
        const services = await db.orm.public.Booking.all();
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
