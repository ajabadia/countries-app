﻿﻿﻿﻿﻿// controllers/areasController.js
const asyncHandler = require('express-async-handler');
const areasService = require('../services/areasService.js');

// GET /api/areas/count
const getCount = asyncHandler(async (req, res) => {
  const result = areasService.getCount();
  res.json(result);
});

// GET /api/areas
const getAll = asyncHandler(async (req, res) => {
  const result = areasService.getAll(['id', 'defaultname'], 'id');
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
  const newItem = areasService.getById(id);
  res.status(201).json(newItem);
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
  const updatedItem = areasService.getById(req.params.id);
  res.json(updatedItem);
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