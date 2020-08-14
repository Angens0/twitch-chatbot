const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const start = async () => {
    io.on("connection", socket => {
        console.log("a user connected");

        setTimeout(() => {
            io.emit("meow");
        }, 10000);
        setTimeout(() => {
            io.emit("meow");
        }, 15000);
    });

    http.listen(4000, () => {
        console.log("listening on :4000");
    });
};

start();
