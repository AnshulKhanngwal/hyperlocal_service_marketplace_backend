// const { PrismaClient } = require('@prisma/client');
import express from 'express';
import {getBookings, updateBooking, createBooking} from '../controllers/bookingController.js'
import authenticateToken from '../middleware/authentication.js';

const bookingRouter = express.Router()


// Example of creating a service provider
bookingRouter.get('/getBookings', authenticateToken, getBookings);
bookingRouter.post('/createBooking', authenticateToken, createBooking);
bookingRouter.post('/updateBooking', authenticateToken, updateBooking);

export default bookingRouter;
