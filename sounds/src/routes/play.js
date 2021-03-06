const express = require("express");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.post("/api/sounds/play", auth, (req, res) => {
    const { url } = req.body;

    // imported here to avoid circular dependecy
    const { io } = require("../io");

    io.emit("url", url);
    return res.sendStatus(200);
});

router.post("/api/sounds/play/play", auth, (req, res) => {
    // imported here to avoid circular dependecy
    const { io } = require("../io");

    io.emit("playing", true);
    return res.sendStatus(200);
});

router.post("/api/sounds/play/pause", auth, (req, res) => {
    // imported here to avoid circular dependecy
    const { io } = require("../io");

    io.emit("playing", false);
    return res.sendStatus(200);
});

router.post("/api/sounds/play/meow", auth, (req, res) => {
    // imported here to avoid circular dependecy
    const { io } = require("../io");

    io.emit("meow");
    return res.sendStatus(200);
});

module.exports = { playRouter: router };
