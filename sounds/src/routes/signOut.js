const express = require("express");

const router = express.Router();

router.post("/api/sounds/signout", async (req, res) => {
    req.session.jwt = undefined;
    return res.sendStatus(200);
});

module.exports = { signOutRouter: router };
