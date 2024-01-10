const jwt = require("jsonwebtoken");
const env = require("../config/env.config");

function authGuard(req, res, next) {


    try {
        const token = req.headers.authorization?.split(" ")[1];
        const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRETS);
        req.user = {
          id: payload.id,
          role: payload.role
        };
        next();
    } catch (error) {
        return res.status(400).send({error: error.message});
    }
}

module.exports = authGuard;

