import 'dotenv/config'
import express from 'express';
import authRouter from './routes/authRoutes.js'
import { Temporal } from "@js-temporal/polyfill";

globalThis.Temporal = Temporal;

const app = express();

app.get('/', (req, res) =>{
    res.send('<h1>Hello, Express.js Server!</h1>')
})

const port = process.env.PORT;

// const authRoutes = require('./routes/authRoutes')

app.use('/auth', authRouter);

app.listen(port, () => {
    console.log("Temporal:", typeof globalThis.Temporal);
    console.log(`Server is running at ${port}`)
})
