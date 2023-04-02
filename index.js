const express = require('express');
const path = require('path');
const helmet = require("helmet");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: ['http://localhost']
    }
});

app.use('/\*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/db/test/:id', (req, res) => {
    let id = req.params.id;
    data = {
        id
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data, null, 3));
});

app.get('/db/test2', (req, res) => {
    let id = req.query.id;
    data = {
        id
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data, null, 3));
});


io.on('connection', (socket) => {
    socket.on('user-connect', (user_id) => {
        console.log(`User id ${user_id} connected`);
        io.emit('user-connect', user_id);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('test', (data) => {
        io.emit('test', data);
        console.log(data);
    });
})

server.listen(3000, () => {
    console.log('listening on *:3000');
}); 