const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
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
	banList: [{
		type: Schema.Types.ObjectId
	}]
});

module.exports = mongoose.model('User', userSchema);
