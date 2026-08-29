const http = require('http');

const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.send('<h1>Hello, Express.js Server!</h1>')
})

const port = process.env.port || 3000;

const authRoutes = require('./routes/authRoutes')

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})



// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });

//     res.write('<h1>Hello1, Node.js HTTP Server!</h1>');
//     res.end();
// });

// // Specify the port to listen on
// const port = 3000;

// // Start the server
// server.listen(port, () => {
//     console.log(`Node.js HTTP server is running on port ${port}`);
// });