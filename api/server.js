// implement your server here
// require your posts router and connect it here
// ORDER IS IMPORTANT
const express = require('express');

const server = express();

server.use(express.json()); // teach express how to parse json bodys

server.use('*', (req, res) => {
    res.status(404).json({ message: 'not found' })
})


module.exports = server;