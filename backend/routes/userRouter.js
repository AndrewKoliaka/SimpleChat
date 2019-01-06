const express = require('express');
const userController = require('../controllers/userController');
const httpAuthMiddleware = require('../middlewares/httpAuthMiddleware');

const router = express.Router();

router.get('/', httpAuthMiddleware, userController.getUserList);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/:id', httpAuthMiddleware, userController.updateUser);
router.delete('/:id', httpAuthMiddleware, userController.deleteUser);
router.put('/:id/block', httpAuthMiddleware, userController.blockUser);
router.put('/:id/unblock', httpAuthMiddleware, userController.unBlockUser);

module.exports = router;
