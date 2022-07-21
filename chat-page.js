const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/chat-page.html")
})

io.on("connection", socket => {
    console.log("User is connected")
    socket.on("chat message", msg => {
        io.emit("chat message", msg)
    })
    socket.on("disconnect", () => {
        console.log("User disconnected")
    })
})

server.listen(3000, () => console.log("Server listening on port 3000"))
