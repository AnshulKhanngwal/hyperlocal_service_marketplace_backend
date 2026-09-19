import 'dotenv/config'
import express from 'express';
import authRouter from './routes/authRoutes.js'
import serviceRouter from './routes/serviceRoutes.js'
import bookingRouter from './routes/bookingRoutes.js'
import queryRouter from './routes/queryRoutes.js'
import notificationRouter from './routes/notificationRoutes.js'
import { Temporal } from "@js-temporal/polyfill";
import cors from 'cors';

globalThis.Temporal = Temporal;

const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('<h1>Hello, Express.js Server!</h1>')
})

const port = process.env.PORT;

// const authRoutes = require('./routes/authRoutes')

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use('/auth', authRouter);
app.use('/service', serviceRouter);
app.use('/booking', bookingRouter);
app.use('/query', queryRouter);
app.use('/notification', notificationRouter);

app.listen(port, () => {
    console.log("Temporal:", typeof globalThis.Temporal);
    console.log(`Server is running at ${port}`)
})
