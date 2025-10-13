// D:/desarrollos/countries2/backend/controllers/countriesController.js

const { getDB } = require('../db/database');
const { validationResult } = require('express-validator'); // Para leer los resultados de la validación

// La firma de cada función ahora incluye 'next' para pasar los errores
function getCountriesCount(req, res, next) {
  const db = getDB();
  try {
    const result = db.prepare('SELECT COUNT(*) as total FROM countries').get();
    res.json({ total: result.total });
  } catch (err) {
    next(err); // Pasamos el error al middleware central
  }
}

function getAllCountries(req, res, next) {
  const db = getDB();
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.max(1, parseInt(req.query.pageSize) || 10);
    const search = req.query.search ? req.query.search.trim() : null;
    const offset = (page - 1) * pageSize;
    const sortKey = req.query.sortKey || 'defaultname';
    const allowedSorts = ['defaultname', 'alpha2may', 'alpha3may', 'numeric'];
    const validSortKey = allowedSorts.includes(sortKey) ? sortKey : 'defaultname';
    const sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC';

    const whereClause = search ? `WHERE defaultname LIKE '%' || ? || '%'` : 'WHERE 1=1';
    const searchParam = search ? [search] : [];

    const countries = db.prepare(`
      SELECT id, alpha2may, alpha3may, numeric, defaultname
      FROM countries
      ${whereClause}
      ORDER BY ${validSortKey} COLLATE NOCASE ${sortOrder}
      LIMIT ? OFFSET ?;
    `).all(...searchParam, pageSize, offset);

    const total = db.prepare(`
      SELECT COUNT(*) as total
      FROM countries
      ${whereClause}
    `).get(...searchParam).total;

    res.json({ data: countries, total });
  } catch (err) {
    next(err);
  }
}

function getCountryById(req, res, next) {
  const db = getDB();
  try {
    const country = db.prepare('SELECT id, alpha2may, alpha3may, numeric, defaultname FROM countries WHERE id = ?').get(req.params.id);
    if (!country) {
      return res.status(404).json({ error: 'País no encontrado' });
    }
    res.json(country);
  } catch (err) {
    next(err);
  }
}

function createCountry(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = getDB();
  const { id, alpha2may, alpha3may, numeric, defaultname } = req.body;
  try {
    db.prepare('INSERT INTO countries (id, alpha2may, alpha3may, numeric, defaultname) VALUES (?, ?, ?, ?, ?)')
      .run(id, alpha2may ?? '', alpha3may ?? '', numeric ?? '', defaultname);
    const created = db.prepare('SELECT id, alpha2may, alpha3may, numeric, defaultname FROM countries WHERE id=?').get(id);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

function updateCountry(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const db = getDB();
  const { alpha2may, alpha3may, numeric, defaultname } = req.body;
  try {
    const stmt = db.prepare('UPDATE countries SET alpha2may=?, alpha3may=?, numeric=?, defaultname=? WHERE id=?');
    const info = stmt.run(alpha2may ?? '', alpha3may ?? '', numeric ?? '', defaultname, req.params.id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'País no encontrado' });
    }
    const updated = db.prepare('SELECT id, alpha2may, alpha3may, numeric, defaultname FROM countries WHERE id=?').get(req.params.id);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

function deleteCountry(req, res, next) {
  const db = getDB();
  try {
    const info = db.prepare('DELETE FROM countries WHERE id = ?').run(req.params.id);
    if (info.changes === 0) {
      return res.status(404).json({ error: 'País no encontrado para borrar' });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCountriesCount,
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry
};