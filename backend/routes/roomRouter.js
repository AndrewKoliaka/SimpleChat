const express = require('express');
const roomController = require('../controllers/roomController');
const httpAuthMiddleware = require('../middlewares/httpAuthMiddleware');

const router = express.Router();

router.use(httpAuthMiddleware);

router.get('/', roomController.getRoomsList);
router.get('/:id', roomController.getRoom);
router.get('/:id/messages', roomController.getHistory);
router.post('/', roomController.createRoom);
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;
