// routes/dependencies.js
const express = require('express');
const router = express.Router();
const dependenciesController = require('../controllers/dependenciesController');

router.get('/count', dependenciesController.getCount);
router.get('/', dependenciesController.getAll);

module.exports = router; // <-- Corregido para que solo haya un export