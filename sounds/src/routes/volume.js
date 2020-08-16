const express = require("express");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.post("/volume", auth, (req, res) => {
    const { volume } = req.body;
    if (typeof volume !== "number") {
        return res.sendStatus(400);
    }

    // imported here to avoid circular dependecy
    const { io } = require("../io");
    io.emit("volume", volume);
    return res.sendStatus(200);
});

module.exports = { volumeRouter: router };
