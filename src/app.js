const express = require('express')
const configServer = require('./config/server.config');
const { port } = require('./env');
const socketIO = require('socket.io');
const configSocket = require('./config/socket-io');
const http = require('http');

const app = configServer(express());
let server = http.createServer(app);

let socket = socketIO(server);

configSocket(socket);


server.listen(port, () => {
    console.log(`Ejecutando en el ${port}`)
})