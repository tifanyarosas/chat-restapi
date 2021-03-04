const jwt = require('jsonwebtoken');
const secretKey = require("../config/auth.config.js");
const bearerPrefix = 'Bearer';


const verifyToken = (req, res, next) => {

    if (!req.headers['authorization']) {
        res.status(403).send({message: "Unauthorized access"});
        return;
    }
    const authorization = req.headers['authorization'].split(' ');
    if (authorization[0] !== bearerPrefix) {
        res.status(401).send({message: "Unauthorized access"});
        return;
    } else {
        const token = authorization[1];
        if (token) {
            jwt.verify(token, secretKey, (err, user) => {
                if (err) {
                    res.status(403).send({message: "Unauthorized access"});
                    return;
                }
                req.user = user;
                next();
            });
        } else {
            res.status(401).send({message: "No token provided!"});
        }
    }
};

module.exports = verifyToken;