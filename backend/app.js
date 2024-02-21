const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Websockets!</h1>");
});

io.on("connection", (socket) => {
    console.log("a user connected");
    io.emit("userConnection", "Usuario se acaba de conectar");
    socket.on("disconnect", () => {
        console.log("user disconnected");
        io.emit("userConnection", "Usuario se acaba de desconectar");
    });
    socket.on("message", (msg) => {
        console.log(msg);
        io.emit("message", msg);
    });
    socket.on("userConnection", (msg) => {
        console.log(msg);
        io.emit("userConnection", msg);
    });
});

app.listen(3000, () => {
    console.log("APP listening on *:3000");
});

server.listen(3333, () => {
    console.log("WEB SERVER listening on *:3333");
});
