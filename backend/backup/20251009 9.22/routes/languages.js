const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/languagesController');

router.get('/', ctrl.list);

module.exports = router;
