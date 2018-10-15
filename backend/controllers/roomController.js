const Room = require('../models/roomModel');
const Message = require('../models/messageModel');

module.exports.getRoomsList = async (req, res) => {
    try {
        const userRooms = await Room.find({ participants: req.tokenData.id });

        res.status(200).json(userRooms);
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
    const { id, participants = [], name = '', dateCreated = Date.now() } = req.body;

    try {
        await Room.findOneAndUpdate({ _id: id }, { $set: { name, participants, dateCreated } });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.deleteRoom = async (req, res) => {
    const { id } = req.body;

    try {
        await Room.findOneAndDelete({ _id: id });
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
