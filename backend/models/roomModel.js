const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = Schema({
    name: {
        type: String,
        default: 'room'
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Room', roomSchema);
