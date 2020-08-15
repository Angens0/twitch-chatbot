const { httpServer } = require("./httpServer");

const io = require("socket.io")(httpServer);

io.on("connection", socket => {
    console.log("a user connected");

    setTimeout(() => {
        io.emit("meow");
    }, 10000);
    setTimeout(() => {
        io.emit("meow");
    }, 15000);
});

module.exports = { io };
