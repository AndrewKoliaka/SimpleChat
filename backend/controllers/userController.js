const User = require('../models/userModel');
const jwtUtils = require('../utils/jwt');

module.exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email, password });

		if (user) {
			const tokenData = { id: user._id, name: user.name, email: user.email };
			const token = await jwtUtils.sign(tokenData);

			res.cookie('token', token);
			res.status(200).send(token);
		} else {
			res.status(404).json({ info: "User not found" });
		}
	} catch (error) {
		res.status(500).json(error);
	}
}

module.exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) return res.status(409).json({ info: "User exists" });
		const createdUser = await User.create({ name, email, password });
		const tokenData = { id: createdUser._id, name: createdUser.name, email: createdUser.email };
		const token = await jwtUtils.sign(tokenData);

		res.cookie('token', token);
		res.status(200).send(token);
	} catch (error) {
		res.status(500).json(error);
	}
}

module.exports.getUser = async (req, res) => {
	res.send('NOT_IMPLEMENTED: get user');
}

module.exports.updateUser = async (req, res) => {
	res.send('NOT_IMPLEMENTED: update user');
}

module.exports.deleteUser = async (req, res) => {
	res.send('NOT_IMPLEMENTED: delete user');
}
