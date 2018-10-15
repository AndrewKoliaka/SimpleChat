const Message = require('../models/messageModel');

module.exports.postMessage = async (req, res) => {
    try {
        await Message.create(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.updateMessage = async (req, res) => {
    const { id, userId, roomId, text, timestamp = Date.now() } = req.body;

    try {
        await Message.findOneAndUpdate({ _id: id }, { $set: { userId, roomId, text, timestamp } })
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.deleteMessage = async (req, res) => {
    const { id } = req.body;

    try {
        await Message.findOneAndDelete({ _id: id });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}
