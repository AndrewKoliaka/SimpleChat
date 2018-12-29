const jwtUtils = require('../utils/jwt');

module.exports = async (req, res, next) => {
    const { token } = req.cookies;

    try {
        req.tokenData = await jwtUtils.verify(token);
        next();
    } catch (error) {
        res.status(401).json({ info: 'Unauthorized' });
    }
};
