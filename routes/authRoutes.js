// const { PrismaClient } = require('@prisma/client');
import express from 'express';
import {handleRegistration, createAdmin, getUsers} from '../controllers/authController.js'

const authRouter = express.Router()


// Example of creating a service provider
authRouter.post('/register', handleRegistration);
authRouter.get('/createAdmin', createAdmin);
authRouter.get('/getUsers', getUsers);

export default authRouter;

