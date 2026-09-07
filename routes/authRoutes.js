// const { PrismaClient } = require('@prisma/client');
import express from 'express';
import {handleRegistration, createAdmin, getUsers, login} from '../controllers/authController.js'
import authenticateToken from '../middleware/authentication.js';

const authRouter = express.Router()


// Example of creating a service provider
authRouter.post('/register', handleRegistration);
authRouter.get('/createAdmin', createAdmin);
authRouter.get('/getUsers', authenticateToken, getUsers);
authRouter.get('/login', login);

export default authRouter;
