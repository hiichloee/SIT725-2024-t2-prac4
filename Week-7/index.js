
const express = require('express');
const http = require('http');  // use HTTP module
const socketIo = require('socket.io');  // import Socket.IO
const ejs = require('ejs');
const path = require('path');
const calculationController = require('./controllers/calculationController');

const app = new express();
const server = http.createServer(app);  // create http server 
const io = socketIo(server);  // bind Socket.IO to server

const port = 3000;

app.engine("html",ejs.__express)
app.set("view engine","html") 

app.use(express.static('public'))

// routers
app.get('/', calculationController.renderIndex); // show index
app.get('/add', calculationController.addNumbers); // add numbers
app.get('/history', calculationController.getHistory); // get history
app.post('/history/delete', calculationController.deleteHistory); // delete history


// Set up WebSocket events
io.on('connection', (socket) => {
    console.log('A user connected, OK! ID:', socket.id);

    setInterval(() => {
        const randomNum = parseInt(Math.random() * 10);
        socket.emit('num', randomNum); 
    }, 1000);

    socket.on('message', (data) => {
        console.log('Receive msg:', data); 
        socket.emit('response', { message: 'Message received!' });
    });

    socket.on('addNumbers', (data) => {
        console.log('Received numbers from client:', data);
        const sum = parseInt(data.num1) + parseInt(data.num2);
        socket.emit('calculationResult', { result: sum });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected.', socket.id);
    });

});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
