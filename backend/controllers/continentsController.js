// controllers/continentsController.js
const { getDB } = require('../db/database');
const TABLE_NAME = 'continents';

// GET /api/continents/count
function getCount(req, res, next) {
  const db = getDB();
  try {
    const result = db.prepare(`SELECT COUNT(*) as total FROM ${TABLE_NAME}`).get();
    res.json({ total: result.total || 0 });
  } catch (err) {
    next(err);
  }
}

// GET /api/continents
function getAll(req, res, next) {
  const db = getDB();
  try {
    const rows = db.prepare(`SELECT id, defaultname FROM ${TABLE_NAME} ORDER BY id`).all();
    res.json({ data: rows, total: rows.length });
  } catch (err) {
    next(err);
  }
}

// GET /api/continents/:id
function getById(req, res, next) {
    // Lógica para obtener por ID (preparada para el futuro)
    res.status(501).json({ message: 'No implementado' });
}

// POST /api/continents
function create(req, res, next) {
    // Lógica para crear (preparada para el futuro)
    res.status(501).json({ message: 'No implementado' });
}

// PUT /api/continents/:id
function update(req, res, next) {
    // Lógica para actualizar (preparada para el futuro)
    res.status(501).json({ message: 'No implementado' });
}

// DELETE /api/continents/:id
function remove(req, res, next) {
    // Lógica para borrar (preparada para el futuro)
    res.status(501).json({ message: 'No implementado' });
}

module.exports = {
  getCount,
  getAll,
  getById,
  create,
  update,
  remove,
};