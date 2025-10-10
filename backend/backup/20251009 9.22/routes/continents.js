const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/continentsController');

router.get('/', ctrl.list);

module.exports = router;
