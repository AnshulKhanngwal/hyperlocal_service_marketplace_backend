// const { PrismaClient } = require('@prisma/client');
import express from 'express';
import {handleRegistration, createAdmin} from '../controllers/authController.js'

const authRouter = express.Router()


// Example of creating a service provider
authRouter.post('/register', handleRegistration);
authRouter.post('createAdmin', createAdmin);

export default authRouter;

