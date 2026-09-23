// const { PrismaClient } = require('@prisma/client');
import express from 'express';
import {getNotifications, updateNotification, createNotification} from '../controllers/notificationController.js'
import authenticateToken from '../middleware/authentication.js';

const notificationRouter = express.Router()


// Example of creating a service provider
notificationRouter.get('/getNotifications', authenticateToken, getNotifications);
notificationRouter.post('/createNotification', authenticateToken, createNotification);
notificationRouter.post('/updateNotification', authenticateToken, updateNotification);

export default notificationRouter;
