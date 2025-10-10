const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dependenciesController');

router.get('/', ctrl.list);

module.exports = router;
