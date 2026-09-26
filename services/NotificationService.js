import { db } from "../src/prisma/db.ts";

export async function generateNotification(userId, description){
    const newNotification = await db.orm.public.Notification.create({
                userId: userId,
                description: description
            });
    return true;
}