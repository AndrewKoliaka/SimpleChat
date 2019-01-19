const Room = require('../models/roomModel');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async (req, res, next) => {
    const roomId = req.params.id;
    const userId = req.tokenData.id;

    try {
        const room = await Room.findOne({ _id: roomId });

        if (room && ObjectId(room.adminId).equals(ObjectId(userId))) {
            next();
        } else {
            res.status(403).json({ info: 'Forbidden' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
