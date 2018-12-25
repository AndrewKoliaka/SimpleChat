const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    roomId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', messageSchema);
