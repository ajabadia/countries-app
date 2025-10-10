const { getDB } = require('../db/database');

function list(req, res) {
  const db = getDB();
  const rows = db.prepare('SELECT id, defaultname FROM languages ORDER BY id').all();
  res.json(rows);
}

module.exports = { list };
