﻿// controllers/multilingualnamesController.js
const asyncHandler = require('express-async-handler');
const multilingualnamesService = require('../services/multilingualnamesService.js');

const getCount = asyncHandler(async (req, res) => {
  const result = multilingualnamesService.getCount();
  res.json(result);
});

const getAll = asyncHandler(async (req, res) => {
  const result = multilingualnamesService.getAll(['id', 'entity_id', 'language', 'value', 'type'], 'entity_id');
  res.json(result);
});

const getById = asyncHandler(async (req, res) => {
  const item = multilingualnamesService.getById(req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Registro no encontrado' });
  }
  res.json(item);
});

const create = asyncHandler(async (req, res) => {
  const { entity_id, language, value, type } = req.body;
  if (!entity_id || !language || !value || !type) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios: entity_id, language, value, type' });
  }
  const result = multilingualnamesService.create({ entity_id, language, value, type });
  const newItem = multilingualnamesService.getById(result.lastInsertRowid);
  res.status(201).json(newItem);
});

const update = asyncHandler(async (req, res) => {
  const dataToUpdate = { ...req.body };
  // No permitimos cambiar el id
  delete dataToUpdate.id;

  if (Object.keys(dataToUpdate).length === 0) {
    return res.status(400).json({ error: 'Se requiere al menos un campo para actualizar' });
  }

  const info = multilingualnamesService.update(req.params.id, dataToUpdate);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Registro no encontrado' });
  }
  const updatedItem = multilingualnamesService.getById(req.params.id);
  res.json(updatedItem);
});

const remove = asyncHandler(async (req, res) => {
  const info = multilingualnamesService.remove(req.params.id);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Registro no encontrado para borrar' });
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