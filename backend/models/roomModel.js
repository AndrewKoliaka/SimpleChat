const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'room'
    },
    users: {
        type: Array,
        default: []
    },
    dateCreated: {
        type: Date
    }
});

module.exports = mongoose.model('Room', roomSchema);
