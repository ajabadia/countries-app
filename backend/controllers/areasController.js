// controllers/areasController.js
const { getDB } = require('../db/database');
const TABLE_NAME = 'areas';

// GET /api/areas/count
function getCount(req, res, next) {
  const db = getDB();
  try {
    const result = db.prepare(`SELECT COUNT(*) as total FROM ${TABLE_NAME}`).get();
    res.json({ total: result.total || 0 });
  } catch (err) {
    next(err);
  }
}

// GET /api/areas
function getAll(req, res, next) {
  const db = getDB();
  try {
    const rows = db.prepare(`SELECT id, defaultname FROM ${TABLE_NAME} ORDER BY id`).all();
    // Preparamos para el futuro: la respuesta siempre debe ser un objeto { data, total }
    res.json({ data: rows, total: rows.length });
  } catch (err) {
    next(err);
  }
}

// GET /api/areas/:id
function getById(req, res, next) {
  const db = getDB();
  try {
    const row = db.prepare(`SELECT id, defaultname FROM ${TABLE_NAME} WHERE id = ?`).get(req.params.id);
    if (!row) {
      return res.status(404).json({ error: 'Área no encontrada' });
    }
    res.json(row);
  } catch (err) {
    next(err);
  }
}

// POST /api/areas
function create(req, res, next) {
  const { id, defaultname } = req.body;
  if (!id || !defaultname) {
    return res.status(400).json({ error: 'Los campos id y defaultname son obligatorios' });
  }
  const db = getDB();
  try {
    db.prepare(`INSERT INTO ${TABLE_NAME} (id, defaultname) VALUES (?, ?)`).run(id, defaultname);
    const newItem = db.prepare(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`).get(id);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
}

// PUT /api/areas/:id
function update(req, res, next) {
  const { defaultname } = req.body;
  if (!defaultname) {
    return res.status(400).json({ error: 'El campo defaultname es obligatorio' });
  }
  const db = getDB();
  try {
    const info = db.prepare(`UPDATE ${TABLE_NAME} SET defaultname = ? WHERE id = ?`).run(defaultname, req.params.id);
    if (info.changes === 0) {
      return res.status(404).json({ error: 'Área no encontrada' });
    }
    const updatedItem = db.prepare(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`).get(req.params.id);
    res.json(updatedItem);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/areas/:id
function remove(req, res, next) {
  const db = getDB();
  try {
    const info = db.prepare(`DELETE FROM ${TABLE_NAME} WHERE id = ?`).run(req.params.id);
    if (info.changes === 0) {
      return res.status(404).json({ error: 'Área no encontrada' });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCount,
  getAll,
  getById,
  create,
  update,
  remove,
};