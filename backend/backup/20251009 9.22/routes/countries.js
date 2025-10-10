const express = require('express');
const router = express.Router();
const { getDB } = require('../db/database'); // Asegúrate de la ruta correcta

router.get('/', (req, res) => {
  const db = getDB();

  const page = Math.max(1, parseInt(req.query.page) || 1);
  const pageSize = Math.max(1, parseInt(req.query.pageSize) || 10);
  const search = req.query.search ? req.query.search.trim() : null;
  const offset = (page - 1) * pageSize;
  // Ahora recogemos sortKey y sortOrder
  const sortKey = req.query.sortKey || 'defaultname';
  // Seguridad: solo permitir campos válidos
  const allowedSorts = ['defaultname', 'alpha2may', 'alpha3may', 'numeric'];
  const validSortKey = allowedSorts.includes(sortKey) ? sortKey : 'defaultname';
  const sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC';


  const countries = db.prepare(`
    SELECT id, alpha2may, alpha3may, numeric, defaultname
    FROM countries
    WHERE (? IS NULL OR defaultname LIKE '%' || ? || '%')
    ORDER BY ${validSortKey} COLLATE NOCASE ${sortOrder}
    LIMIT ? OFFSET ?;
  `).all(search, search, pageSize, offset);

  const total = db.prepare(`
    SELECT COUNT(*) as total
    FROM countries
    WHERE (? IS NULL OR defaultname LIKE '%' || ? || '%')
  `).get(search, search).total;

  res.json({ data: countries, total });
});

router.get('/:id', (req, res) => {
  const db = getDB();
  const country = db.prepare(`
    SELECT id, alpha2may, alpha3may, numeric, defaultname
    FROM countries
    WHERE id = ?
  `).get(req.params.id);

  if (!country) return res.status(404).json({ error: 'Not found' });
  res.json(country);
});

module.exports = router;
