// const { PrismaClient } = require('@prisma/client');
import express from 'express';
import {getServices, updateService, createService} from '../controllers/serviceController.js'
import authenticateToken from '../middleware/authentication.js';

const serviceRouter = express.Router()


// Example of creating a service provider
serviceRouter.get('/getServices', authenticateToken, getServices);
serviceRouter.post('/createService', authenticateToken, createService);
serviceRouter.post('/updateService', authenticateToken, updateService);

export default serviceRouter;
