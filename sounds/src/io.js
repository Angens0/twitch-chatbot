const { httpServer } = require("./httpServer");

const io = require("socket.io")(httpServer, {
    path: "/api/sounds/socket.io",
});

io.on("connection", socket => {
    console.log(`${new Date()}: User ${socket.id} connected`);

    socket.on("disconnect", reason => {
        console.log(`${new Date()}: User ${socket.id} disconnected\nReason:\n`);
        console.log(reason);
    });
});

module.exports = { io };
