// import PrismaClient from '@prisma/client';
// const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// const jwt = require('jsonwebtoken');
import { db } from "../prisma/db.js";

export async function register(req, res){
    // console.log("This is your reqest data : ", req.body)
    const {email, password, name, role} = req.body;
    // res.status(200).json({
    //     "data": req.body 
    // })
    const hashedpass = await bcrypt.hash(password, 12);
    try {
        const newUser = await db.orm.public.User.create({
        // data: {
            email: email,
            password: hashedpass, // Make sure to hash this using bcrypt later!
            name: name,
            role: role ?? 'SERVICE_PROVIDER' // Explicitly setting the role
        // },
        });
        console.log('Provider created:', newUser);
        res.status(201).json({
            "message": "Created Successfully",
            "data": newUser
        })
    } catch (error) {
        console.error('Error creating provider:', error);
        res.status(400).json({
            "message": "Something went wrong.",
            "error": error
        })
    }
}


export async function createAdmin(req, res){
    try {
        const admin = await db.orm.public.User.where({role: "ADMIN"}).first()
        if(admin){
            res.status(201).json({
                "message": "Already created."
            })
        }
        const newProvider = await db.orm.public.User.create({
        // data: {
            email: 'akhanngwal@gmail.com',
            password: 'Test@1234', // Make sure to hash this using bcrypt later!
            name: 'Adminuser',
            role: 'ADMIN' // Explicitly setting the role
        // },
        });
        console.log('Provider created:', newProvider);
    } catch (error) {
        console.error('Error creating provider:', error);
    }
}

export async function login(req, res){
    try{
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({
                "message": "Email and password is requied."
            })
        }
        const user = await db.orm.public.User.where(
            {
                email: email
            }
        ).first()
        console.log("This is your user", user);
        const match = bcrypt.compare(password, user.password);
        if(!user){
            res.status(404).json({
                "message": "Not Found!"
            })
        }
        if(!match){
            res.status(400).json({
                "message": "Wrong username or password!"
            })
        }
        const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);
        res.status(200).json({
            "data": user,
            "accessToken": accessToken
        })
    }catch(e){
        console.log(e)
    }

}

export async function getUsers(req, res){
    const users = await db.orm.public.User.all()
    console.log("Users", users)
    res.status(200).json({
        "msg": "Success",
        "data": users
    })

}

// export default {'handleRegistration', 'createAdmin'};
