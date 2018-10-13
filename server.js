const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config.json');

const app = express();
const router = express.Router();

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
	useNewUrlParser: true
});

const userSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

const User = mongoose.model('User', userSchema);

router.post('/login', async (req, res) => {
	({ email, password } = req.body);

	try {
		const user = await User.findOne({ email, password });
		user ? res.status(200).json({ id: user._id }) : res.sendStatus(404);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/register', async (req, res) => {
	({ name, email, password } = req.body);

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) return res.status(409).send("User exists");
		await User.create({ name, email, password });
		const createdUser = await User.findOne({ email });
		res.status(200).json({ id: createdUser._id });
	} catch (error) {
		res.status(500).json(error);
	}
});

app.use(express.static('bin'));
app.use(cookieParser());
app.use('/api', router);

app.listen(config.port, () => {
    console.log(`Server is listening on ${config.port}`);
});
