import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from "../src/prisma/db.ts";
import { access } from 'node:fs';

export async function register(req, res){
    const {email, password, name, role} = req.body;
    const hashedpass = await bcrypt.hash(password, 12);
    try {
        const newUser = await db.orm.public.User.create({
            email: email,
            password: hashedpass, // Make sure to hash this using bcrypt later!
            name: name,
            role: role ?? 'SERVICE_PROVIDER' // Explicitly setting the role
        });
        const { password, ...safeUser } = newUser;
        const accessToken = jwt.sign(safeUser, process.env.TOKEN_SECRET);
        res.status(201).json({
            "message": "Created Successfully",
            "data": safeUser,
            "token": accessToken
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
    console.log("Entered login in backend")
    try{
        const {email, pass} = req.body;
        if(!email || !pass){
            res.status(400).json({
                "message": "Email and password is requied."
            })
        }
        const user = await db.orm.public.User.where(
            {
                email: email
            }
        ).first()
        if(!user){
            return res.status(404).json({
                "message": "Not Found!"
            })
        }
        console.log("This is your user", user);
        const match = await bcrypt.compare(pass, user.password);
        if(!match){
            return res.status(400).json({
                "message": "Wrong username or password!"
            })
        }
        const { password, ...safeUser } = user;
        const accessToken = jwt.sign(safeUser, process.env.TOKEN_SECRET);
        return res.status(200).json({
            "data": safeUser,
            "accessToken": accessToken
        })
    }catch(e){
        console.log(e)
        return res.status(400).json({
            "data": "Error",
            "message": e
        })
    }

}

export async function getUsers(req, res){
    const users = await db.orm.public.User.all()
    const safeUsers = users//.map(({ password, ...user }) => user);
    console.log("Users", users)
    return res.status(200).json({
        "msg": "Success",
        "data": safeUsers
    })

}

// export default {'handleRegistration', 'createAdmin'};
