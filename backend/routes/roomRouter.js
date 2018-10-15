const express = require('express');
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', roomController.getRoomsList);
router.get('/:id', roomController.getRoom);
router.get('/:id/messages', roomController.getHistory);
router.post('/', roomController.createRoom);
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;
