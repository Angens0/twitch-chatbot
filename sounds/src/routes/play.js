const express = require("express");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.post("/play", auth, (req, res) => {
    const { url } = req.body;

    // imported here to avoid circular dependecy
    const { io } = require("../io");

    io.emit("url", url);
    return res.sendStatus(200);
});

module.exports = { playRouter: router };
