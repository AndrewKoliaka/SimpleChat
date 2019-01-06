const express = require('express');
const messageController = require('../controllers/messageController');
const httpAuthMiddleware = require('../middlewares/httpAuthMiddleware');

const router = express.Router();

router.use(httpAuthMiddleware);

router.put('/:id', messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
