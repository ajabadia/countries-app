const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dependenciesController');
const { getDB } = require('../db/database');

router.get('/', ctrl.list);


// Endpoint de CONTADOR PURO
router.get('/count', (req, res) => {
  const db = getDB();
  try {
    const result = db.prepare('SELECT COUNT(*) as total FROM dependencies').get();
    res.json({ total: result.total });
  } catch (err) {
    res.status(500).json({ error: 'Error al contar dependencias: ' + err.message });
  }
});

module.exports = router;
module.exports = router;
