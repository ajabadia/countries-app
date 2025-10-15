// d:/desarrollos/countries2/backend/routes/countries.js
const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countriesController');

// Rutas para países
router.get('/', countriesController.getAllCountries);
router.get('/:id', countriesController.getCountryById);

module.exports = router;