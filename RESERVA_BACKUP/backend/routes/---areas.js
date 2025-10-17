// routes/areas.js
const express = require('express');
const router = express.Router();
const areasController = require('../controllers/areasController');

router.get('/count', areasController.getCount);
router.get('/', areasController.getAll);
router.get('/:id', areasController.getById);
router.post('/', areasController.create);
router.put('/:id', areasController.update);
router.delete('/:id', areasController.remove);

module.exports = router;