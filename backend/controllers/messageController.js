const Message = require('../models/messageModel');

module.exports.updateMessage = async (req, res) => {
    const { roomId, text, timestamp = Date.now() } = req.body;
    const { id } = req.params;
    const userId = req.tokenData.id;

    try {
        await Message.updateOne({ _id: id }, { userId, roomId, text, timestamp });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports.deleteMessage = async (req, res) => {
    const { id } = req.params;

    try {
        await Message.deleteOne({ _id: id });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
};
