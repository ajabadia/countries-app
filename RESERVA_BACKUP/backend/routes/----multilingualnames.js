// routes/multilingualnames.js
const express = require('express');
const router = express.Router();
// Asegúrate de que el nombre del archivo del controlador coincida
const multilingualnamesController = require('../controllers/multilingualnamesController'); 

router.get('/count', multilingualnamesController.getCount);
router.get('/', multilingualnamesController.getAll);

module.exports = router;