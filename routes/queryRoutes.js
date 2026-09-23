// const { PrismaClient } = require('@prisma/client');
import express from 'express';
import {getQueries, createQuery} from '../controllers/queryController.js'
import authenticateToken from '../middleware/authentication.js';

const queryRouter = express.Router()


// Example of creating a service provider
queryRouter.get('/getQueries', authenticateToken, getQueries);
queryRouter.post('/createQuery', createQuery);

export default queryRouter;
