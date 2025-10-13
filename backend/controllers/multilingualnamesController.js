// controllers/multilingualnamesController.js
const { getDB } = require('../db/database');
const TABLE_NAME = 'multilingualnames';

function getCount(req, res, next) {
  const db = getDB();
  try {
    const result = db.prepare(`SELECT COUNT(*) as total FROM ${TABLE_NAME}`).get();
    res.json({ total: result.total || 0 });
  } catch (err) {
    next(err);
  }
}

function getAll(req, res, next) {
  const db = getDB();
  try {
    const rows = db.prepare(`SELECT id, entity_id, language, value, type FROM ${TABLE_NAME} ORDER BY id`).all();
    res.json({ data: rows, total: rows.length });
  } catch (err) {
    next(err);
  }
}

// ... (Puedes añadir aquí el resto de funciones CRUD: getById, create, update, remove) ...

module.exports = {
  getCount,
  getAll,
};