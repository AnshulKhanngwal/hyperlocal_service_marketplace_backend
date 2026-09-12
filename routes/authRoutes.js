// const { PrismaClient } = require('@prisma/client');
import express from 'express';
import {register, createAdmin, getUsers, login} from '../controllers/authController.js'
import authenticateToken from '../middleware/authentication.js';

const authRouter = express.Router()


// Example of creating a service provider
authRouter.post('/register', register);
authRouter.get('/createAdmin', createAdmin);
authRouter.get('/getUsers', getUsers);
authRouter.post('/login', login);

export default authRouter;
