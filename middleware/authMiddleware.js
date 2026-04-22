const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt')
const respone = require('../utils/respone');

const user = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        respone.error(res, "fail.", "You need to login.")
    }
    const path = authHeader.split(' ');

    const token = path[1];

    // check tar bos mk mean bearer trem trov ot
    if (path[0] != 'Bearer' || path.length != 2) {
        respone.error(res, "Invalid token.", "You need to logn.")
    }

    // check token in db
    const userInfo = await user.findByToken(token);

    if (userInfo.length === 0) {
        respone.error(res, "Invalid token or expire.", "You need to logn.")
    }

    try {
        // verify pon nes kor ban but recoment add find in db muy tt 
        const decode = jwt.verify(token, jwtConfig.secret);
        req.user = decode.id;
        next();

    } catch (error) {
        respone.error(res, "Invalid token.", "You need to logn.")
    }


}

module.exports = authMiddleware;