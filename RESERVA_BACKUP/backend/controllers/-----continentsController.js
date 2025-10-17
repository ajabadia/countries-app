﻿﻿﻿// controllers/continentsController.js
const asyncHandler = require('express-async-handler');
const continentsService = require('../services/continentsService');

// GET /api/continents/count
const getCount = asyncHandler(async (req, res) => {
  const result = continentsService.getCount();
  res.json(result);
});

// GET /api/continents
const getAll = asyncHandler(async (req, res) => {
  const result = continentsService.getAll(['id', 'defaultname'], 'id');
  res.json(result);
});

// GET /api/continents/:id
const getById = asyncHandler(async (req, res) => {
  const continent = continentsService.getById(req.params.id, ['id', 'defaultname']);
  if (!continent) {
    return res.status(404).json({ error: 'Continente no encontrado' });
  }
  res.json(continent);
});

// POST /api/continents
const create = asyncHandler(async (req, res) => {
  const { id, defaultname } = req.body;
  if (!id || !defaultname) {
    return res.status(400).json({ error: 'Los campos id y defaultname son obligatorios' });
  }
  continentsService.create({ id, defaultname });
  const newItem = continentsService.getById(id);
  res.status(201).json(newItem);
});

// PUT /api/continents/:id
const update = asyncHandler(async (req, res) => {
  const { defaultname } = req.body;
  if (!defaultname) {
    return res.status(400).json({ error: 'El campo defaultname es obligatorio' });
  }
  const info = continentsService.update(req.params.id, { defaultname });
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Continente no encontrado' });
  }
  const updatedItem = continentsService.getById(req.params.id);
  res.json(updatedItem);
});

// DELETE /api/continents/:id
const remove = asyncHandler(async (req, res) => {
  const info = continentsService.remove(req.params.id);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Continente no encontrado para borrar' });
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