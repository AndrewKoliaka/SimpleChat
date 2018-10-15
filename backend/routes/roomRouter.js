const express = require('express');
const roomController = require('../controllers/roomController');
const router = express.Router();

router.get('/', roomController.getRoomsList);
router.get('/:id', roomController.getRoom);
router.post('/', roomController.createRoom);
router.put('/:id', roomController.updateRoom);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;
