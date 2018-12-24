const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
        type: String,
        default: 'user'
    },
    avatar: {
        type: String,
        data: Buffer
    },
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	banList: {
		type: Array,
		default: []
	}
});

module.exports = mongoose.model('User', userSchema);
