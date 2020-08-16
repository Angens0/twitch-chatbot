const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");

const { signInRouter } = require("./routes/signIn");
const { signOutRouter } = require("./routes/signOut");
const { playRouter } = require("./routes/play");
const { cssRouter } = require("./routes/css");
const { volumeRouter } = require("./routes/volume");

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
app.use(cssRouter);
app.use(volumeRouter);

module.exports = { app };
