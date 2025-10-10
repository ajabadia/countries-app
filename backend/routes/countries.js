const express = require('express');
const router = express.Router();
const { getDB } = require('../db/database');

// Endpoint de contador puro (no tocar)
router.get('/count', (req, res) => {
  const db = getDB();
  try {
    const result = db.prepare('SELECT COUNT(*) as total FROM countries').get();
    res.json({ total: result.total });
  } catch (err) {
    res.status(500).json({ error: 'Error al contar países: ' + err.message });
  }
});

// Listado paginado, con filtros, ordenación
router.get('/', (req, res) => {
  const db = getDB();
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const pageSize = Math.max(1, parseInt(req.query.pageSize) || 10);
  const search = req.query.search ? req.query.search.trim() : null;
  const offset = (page - 1) * pageSize;
  const sortKey = req.query.sortKey || 'defaultname';
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

// Obtener país por ID
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


// Crear país
router.post('/', (req, res) => {
  const db = getDB();
  const { id, alpha2may, alpha3may, numeric, defaultname } = req.body;
  if (!id || !defaultname) {
    return res.status(400).json({ error: "id y defaultname son obligatorios" });
  }
  try {
    db.prepare('INSERT INTO countries (id, alpha2may, alpha3may, numeric, defaultname) VALUES (?, ?, ?, ?, ?)')
      .run(id, alpha2may ?? '', alpha3may ?? '', numeric ?? '', defaultname);
    const created = db.prepare('SELECT id, alpha2may, alpha3may, numeric, defaultname FROM countries WHERE id=?').get(id);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Error creando país", details: err.message });
  }
});

// Editar país (id no se edita)
router.put('/:id', (req, res) => {
  const db = getDB();
  const { alpha2may, alpha3may, numeric, defaultname } = req.body;

  // Validación robusta: defaultname nunca puede faltar
  if (!defaultname || typeof defaultname !== 'string' || defaultname.trim() === '') {
    return res.status(400).json({ error: 'defaultname es obligatorio' });
  }
  
  // La base de datos acepta string vacía, pero si quieres proteger más, puedes forzar '' como valor mínimo
  try {
    console.log('PUT body:', req.body, 'params:', req.params);

    const stmt = db.prepare(`
      UPDATE countries
      SET alpha2may=?, alpha3may=?, numeric=?, defaultname=?
      WHERE id=?
    `);
    const info = stmt.run(alpha2may ?? '', alpha3may ?? '', numeric ?? '', defaultname, req.params.id);

    // Si no se han modificado filas, el país no existe
    if (info.changes === 0) {
      return res.status(404).json({ error: 'País no encontrado' });
    }

    const updated = db.prepare(`
      SELECT id, alpha2may, alpha3may, numeric, defaultname FROM countries WHERE id=?
    `).get(req.params.id);

    res.json(updated);

  } catch (err) {
    // Esto captura y muestra la causa del error real
    console.error('ERROR EN PUT país', req.body, err);
    res.status(500).json({ error: 'Error actualizando país: ' + err.message });
  }
});





// Borrar país (solo id, igual que antes)
router.delete('/:id', (req, res) => {
  const db = getDB();
  try {
    db.prepare(`DELETE FROM countries WHERE id = ?`).run(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Error borrando país: ' + err.message });
  }
});

module.exports = router;
