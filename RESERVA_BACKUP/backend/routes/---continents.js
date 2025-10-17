// routes/continents.js
const express = require('express');
const router = express.Router();
const continentsController = require('../controllers/continentsController');

router.get('/count', continentsController.getCount);
router.get('/', continentsController.getAll);
// Puedes añadir el resto de rutas cuando las necesites
// router.get('/:id', continentsController.getById);
// router.post('/', continentsController.create);

module.exports = router;
