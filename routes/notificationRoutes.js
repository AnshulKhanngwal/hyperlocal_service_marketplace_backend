// const { PrismaClient } = require('@prisma/client');
import express from 'express';
import {getNotifications, updateNotification, createNotification} from '../controllers/notificationController.js'
import authenticateToken from '../middleware/authentication.js';

const notificationRouter = express.Router()


// Example of creating a service provider
notificationRouter.get('/getNotifications', getNotifications);
notificationRouter.post('/createNotification', createNotification);
notificationRouter.post('/updateNotification', updateNotification);

export default notificationRouter;
