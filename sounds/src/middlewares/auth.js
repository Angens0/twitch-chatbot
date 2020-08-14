const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    if (!req.session.jwt) {
        return next();
    }

    try {
        jwt.verify(req.session.jwt, process.env.JWT_KEY);
        req.auth = true;
    } catch (error) {
        console.log(error);
    }

    return next();
};

module.exports = { auth };
