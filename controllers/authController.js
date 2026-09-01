// import PrismaClient from '@prisma/client';
// const prisma = new PrismaClient();

import { db } from "../prisma/db.js";

export async function handleRegistration(req, res){
    const {email, password, name, role} = req.body;
    try {
        const newProvider = await db.orm.public.User.create({
        data: {
            email: email,
            password: password, // Make sure to hash this using bcrypt later!
            name: name,
            role: 'SERVICE_PROVIDER' // Explicitly setting the role
        },
        });
        console.log('Provider created:', newProvider);
    } catch (error) {
        console.error('Error creating provider:', error);
    }
}


export async function createAdmin(req, res){
    try {
        const newProvider = await db.orm.public.User.create({
        data: {
            email: 'akhanngwal@gmail.com',
            password: 'Test@1234', // Make sure to hash this using bcrypt later!
            name: 'Adminuser',
            role: 'ADMIN' // Explicitly setting the role
        },
        });
        console.log('Provider created:', newProvider);
    } catch (error) {
        console.error('Error creating provider:', error);
    }
}

// export default {'handleRegistration', 'createAdmin'};
