// routes/languages.js
const express = require('express');
const router = express.Router();
const languagesController = require('../controllers/languagesController');

router.get('/count', languagesController.getCount);
router.get('/', languagesController.getAll);

module.exports = router;
