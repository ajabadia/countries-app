const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/continentsController');
const { getDB } = require('../db/database');

router.get('/', ctrl.list);


// Endpoint de CONTADOR PURO
router.get('/count', (req, res) => {
  const db = getDB();
  try {
    const result = db.prepare('SELECT COUNT(*) as total FROM continents').get();
    res.json({ total: result.total });
  } catch (err) {
    res.status(500).json({ error: 'Error al contar continentes: ' + err.message });
  }
});

module.exports = router;


