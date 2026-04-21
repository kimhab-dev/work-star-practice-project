const jwt = require('jsonwebtoken');
const respone = require('../utils/respone');

const authMiddleware = async (req, res, next) => {
    if (!req.header.authorization) {
        respone.error(res, "Get profile fails.", "You need to logn.")
    }
}

module.exports = authMiddleware;