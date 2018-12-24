const User = require('../models/userModel');
const jwtUtils = require('../utils/jwt');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });

        if (user) {
            const tokenData = { id: user._id, name: user.name, email: user.email };
            const token = await jwtUtils.sign(tokenData);

            res.cookie('token', token);
            res.sendStatus(200);
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
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getUserList = async (req, res) => {
    const { id } = req.tokenData;

    try {
        const getUserPromise = User.findOne({ _id: id });
        const getUserListPromise = User.aggregate([
            {
                $match: { _id: { $ne: ObjectId(id) } }
			},
            {
                $project: { name: 1, email: 1, banList: 1 }
			}
		]).then(results => results.filter(userItem => !userItem.banList.includes(id)));

        const results = await Promise.all([getUserPromise, getUserListPromise]);

        const currentUser = results[0];
        const userList = results[1];

        res.status(200).json({ data: { userList, banList: currentUser.banList } });
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.updateUser = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    try {
        await User.updateOne({ _id: id }, { name });
        const newTokenData = { id: req.tokenData.id, email: req.tokenData.email, name };
        const newToken = await jwtUtils.sign(newTokenData);

        res.cookie('token', newToken);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.deleteOne({ _id: id });

        res.clearCookie('token');
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.blockUser = async (req, res) => {
    const blockUserId = req.params.id;
    const userId = req.tokenData.id;

    try {
        await User.updateOne({ _id: userId }, { $addToSet: { banList: blockUserId } });

        res.sendStatus(200);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.unBlockUser = async (req, res) => {
    const unBlockUserId = req.params.id;
    const userId = req.tokenData.id;

    try {
        await User.updateOne({ _id: userId }, { $pull: { banList: unBlockUserId } });

        res.sendStatus(200);
    } catch (error) {
        res.status(500).json(error);
    }
}
