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

let users = []

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

io.on('connection', (socket) => {
    socket.on('user-connect', (username) => {
        console.log(`User ${username} connected`);
        io.emit('user-connect', username);
        users.push(username);
    })
    socket.on('get-users', (username) => {
        socket.emit('get-users', users);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('message-submit', (data) => {
        io.emit('message-submit', data);
        console.log(data);
    });
})

/*
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
*/

server.listen(3000, () => {
    console.log('listening on *:3000');
}); 