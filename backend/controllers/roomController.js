const Room = require('../models/roomModel');
const Message = require('../models/messageModel');

module.exports.getRoomsList = async (req, res) => {
    const { id } = req.tokenData;

    try {
        const userRooms = await Room.find({ participants: id });

        res.status(200).json({ data: userRooms });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.getRoom = async (req, res) => {
    const { id } = req.query;

    try {
        const roomData = await Room.find({ _id: id });

        res.status(200).json(roomData);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.createRoom = async (req, res) => {
    try {
        await Room.create(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.updateRoom = async (req, res) => {
    const { participants, name, dateCreated = Date.now() } = req.body;
    const { id } = req.params;

    try {
        await Room.updateOne({ _id: id }, { name, participants, dateCreated });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.deleteRoom = async (req, res) => {
    const { id } = req.params;

    try {
        await Room.deleteOne({ _id: id });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.getHistory = async (req, res) => {
    const { id } = req.query;

    try {
        const messages = await Message.find({ roomId: id });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).send(error);
    }
}
