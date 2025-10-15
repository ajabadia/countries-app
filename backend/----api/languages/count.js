// areasCount.js
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '..', '..', 'db', 'countries.db'));

router.get('/count', (req, res) => {
  db.get('SELECT COUNT(*) as total FROM languages', [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ total: row.total });
  });
});

module.exports = router;
