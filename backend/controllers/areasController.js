﻿﻿﻿﻿﻿﻿﻿// controllers/areasController.js
const asyncHandler = require('express-async-handler');
const areasService = require('../services/areasService.js');

// GET /api/areas/count
const getCount = asyncHandler(async (req, res) => {
  const result = areasService.getCount();
  res.json(result);
});

// GET /api/areas
const getAll = asyncHandler(async (req, res) => {
  // Pasamos las opciones como un objeto para que coincida con la firma del método en BaseService
  const options = {
    columns: ['id', 'defaultname'],
    orderBy: 'id',
    orderDir: 'asc'
  };
  const result = areasService.getAll(options);
  res.json(result);
});

// GET /api/areas/:id
const getById = asyncHandler(async (req, res) => {
  const area = areasService.getById(req.params.id, ['id', 'defaultname']);
  if (!area) {
    return res.status(404).json({ error: 'Área no encontrada' });
  }
  res.json(area);
});

// POST /api/areas
const create = asyncHandler(async (req, res) => {
  const { id, defaultname } = req.body;
  // La validación simple se mantiene en el controlador
  if (!id || !defaultname) {
    return res.status(400).json({ error: 'Los campos id y defaultname son obligatorios' });
  }
  areasService.create({ id, defaultname });
  // Evitamos una consulta extra a la BD. Ya tenemos los datos del nuevo item.
  res.status(201).json({ id, defaultname });
});

// PUT /api/areas/:id
const update = asyncHandler(async (req, res) => {
  const { defaultname } = req.body;
  // La validación simple se mantiene en el controlador
  if (!defaultname) {
    return res.status(400).json({ error: 'El campo defaultname es obligatorio' });
  }
  const info = areasService.update(req.params.id, { defaultname });
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Área no encontrada' });
  }
  // Evitamos una consulta extra a la BD. Devolvemos el objeto actualizado con los datos disponibles.
  res.json({ id: req.params.id, defaultname });
});

// DELETE /api/areas/:id
const remove = asyncHandler(async (req, res) => {
  const info = areasService.remove(req.params.id);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Área no encontrada' });
  }
  res.status(204).end();
});

module.exports = {
  getCount,
  getAll,
  getById,
  create,
  update,
  remove,
};