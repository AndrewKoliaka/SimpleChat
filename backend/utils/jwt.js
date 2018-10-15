const jwt = require('jsonwebtoken');
const jwtKey = require('../config/config.json').jwtKey;

module.exports.sign = async data => {
    try {
        return await jwt.sign(data, jwtKey, { expiresIn: '1d' });
    } catch (error) {
        throw new Error(error);
    }
}

module.exports.verify = async token => {
    try {
        return await jwt.verify(token, jwtKey);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports.decode = token => jwt.decode(token, { complete: true });
