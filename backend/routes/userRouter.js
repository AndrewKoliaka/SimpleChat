const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, userController.getUserList);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.put('/:id/block', authMiddleware, userController.blockUser);
router.put('/:id/unblock', authMiddleware, userController.unBlockUser);

module.exports = router;
