const express = require("express");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.post("/api/sounds/css/:property/:value", auth, (req, res) => {
    // imported here to avoid circular dependecy
    const { io } = require("../io");
    io.emit("css", req.params.property, req.params.value);
    return res.sendStatus(200);
});

module.exports = { cssRouter: router };
