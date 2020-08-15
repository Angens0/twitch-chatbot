const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");

const { signInRouter } = require("./routes/signIn");
const { signOutRouter } = require("./routes/signOut");
const { playRouter } = require("./routes/play");

const app = express();

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
app.use(playRouter);

module.exports = { app };