const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/api/sounds/signin", async (req, res) => {
    const { password } = req.body;
    if (!password) {
        return res.sendStatus(400);
    }

    const isValid = await bcrypt.compare(password, process.env.PW);
    if (!isValid) {
        return res.sendStatus(400);
    }

    const token = jwt.sign({}, process.env.JWT_KEY);
    req.session.jwt = token;
    return res.sendStatus(200);
});

module.exports = { signInRouter: router };
