const Room = require('../models/roomModel');
const Message = require('../models/messageModel');
const ObjectId = require('mongoose').Types.ObjectId;

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
    const { id } = req.params;

    try {
        const roomData = await Room.findOne({ _id: id })
            .populate('participants', ['name', 'email']);

        res.status(200).json({ data: roomData });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.createRoom = async (req, res) => {
    const { name, participants } = req.body;

    try {
        const roomData = {
            name,
            participants: participants.map(id => ObjectId(id))
        };
        const createdRoom = await Room.create(roomData);

        res.status(200).json({ data: createdRoom });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.updateRoom = async (req, res) => {
    const { name, participants } = req.body;
    const { id } = req.params;

    try {
        await Room.updateOne({ _id: id }, { name, participants });
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
