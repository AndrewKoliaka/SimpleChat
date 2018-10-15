const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'room'
    },
    participants: {
        type: Array,
        default: []
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Room', roomSchema);
