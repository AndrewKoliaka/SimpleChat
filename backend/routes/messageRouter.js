const express = require('express');
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', messageController.postMessage);
router.put('/:id', messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
