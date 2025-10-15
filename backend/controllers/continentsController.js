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
const create = (req, res) => res.status(501).json({ message: 'No implementado' });

// PUT /api/continents/:id
const update = (req, res) => res.status(501).json({ message: 'No implementado' });

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