const express = require('express');
const roomController = require('../controllers/roomController');
const httpAuthMiddleware = require('../middlewares/httpAuthMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

router.use(httpAuthMiddleware);

router.get('/', roomController.getRoomsList);
router.get('/:id', roomController.getRoom);
router.get('/:id/messages', roomController.getHistory);
router.post('/', roomController.createRoom);
router.put('/:id', adminMiddleware, roomController.updateRoom);
router.put('/:id/leave', roomController.leaveRoom);
router.delete('/:id', adminMiddleware, roomController.deleteRoom);

module.exports = router;
