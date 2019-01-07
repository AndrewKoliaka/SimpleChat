const Message = require('../models/messageModel');
const socketEvents = require('../constants/socketEvents');
const liveClients = [];

async function onMessage (data, cb) {
    const { roomId, text } = data;
    const { name } = this.tokenData;
    const userId = this.tokenData.id;

    try {
        const createdMessage = await Message.create({ roomId, userId, text });
        const eventData = {
            _id: createdMessage._id,
            user: { name },
            roomId,
            text
        };

        liveClients.forEach(client => client.emit(socketEvents.MESSAGE, eventData));
        if (typeof cb === 'function') cb();
    } catch (error) {
        throw new Error(error);
    }
};

async function onDisconnect (socket) {
    const disconnectedClientIndex = liveClients.indexOf(socket);

    liveClients.splice(disconnectedClientIndex, 1);
};

function onConnect (socket) {
    liveClients.push(socket);

    socket.on(socketEvents.DISCONNECT, onDisconnect);
    socket.on(socketEvents.MESSAGE, onMessage);
    socket.on(socketEvents.MESSAGE_IS_TYPING, onTypeMessage);
};

function onTypeMessage (data, cb) {
    const { name } = this.tokenData;

    this.broadcast.emit(socketEvents.MESSAGE_IS_TYPING, { message: data, name });

    if (typeof cb === 'function') cb();
};

module.exports.init = server => {
    server.on(socketEvents.CONNECT, onConnect);
};
