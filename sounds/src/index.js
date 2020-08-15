const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const cookieSession = require("cookie-session");
const { signInRouter } = require("./routes/signIn");
const { auth } = require("./middlewares/auth");
const { signOutRouter } = require("./routes/signOut");

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

    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        })
    );
    app.use(express.json());
    app.use(
        cookieSession({
            signed: false,
            secure: false,
        })
    );

    app.use(signInRouter);
    app.use(signOutRouter);
    app.post("/play", auth, (req, res) => {
        if (!req.auth) {
            return res.sendStatus(401);
        }
        const { url } = req.body;

        io.emit("url", url);
        return res.sendStatus(200);
    });

    http.listen(4000, () => {
        console.log("listening on :4000");
    });
};

start();
