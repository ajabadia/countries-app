﻿﻿﻿// controllers/languagesController.js
const asyncHandler = require('express-async-handler');
const languagesService = require('../services/languagesService');

const getCount = asyncHandler(async (req, res) => {
  const result = languagesService.getCount();
  res.json(result);
});

const getAll = asyncHandler(async (req, res) => {
  // Seleccionamos las columnas específicas que nos interesan
  const result = languagesService.getAll(['id', 'name', 'active'], 'id');
  res.json(result);
});

const getById = asyncHandler(async (req, res) => {
  const language = languagesService.getById(req.params.id);
  if (!language) {
    return res.status(404).json({ error: 'Idioma no encontrado' });
  }
  res.json(language);
});

const create = asyncHandler(async (req, res) => {
  const { id, name, active } = req.body;
  if (!id || !name) {
    return res.status(400).json({ error: 'Los campos id y name son obligatorios' });
  }
  languagesService.create({ id, name, active: active ?? 0 });
  const newItem = languagesService.getById(id);
  res.status(201).json(newItem);
});

const update = asyncHandler(async (req, res) => {
  const { name, active } = req.body;
  const dataToUpdate = {};
  if (name !== undefined) dataToUpdate.name = name;
  if (active !== undefined) dataToUpdate.active = active;

  if (Object.keys(dataToUpdate).length === 0) {
    return res.status(400).json({ error: 'Se requiere al menos un campo (name o active) para actualizar' });
  }

  const info = languagesService.update(req.params.id, dataToUpdate);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Idioma no encontrado' });
  }
  const updatedItem = languagesService.getById(req.params.id);
  res.json(updatedItem);
});

const remove = asyncHandler(async (req, res) => {
  const info = languagesService.remove(req.params.id);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Idioma no encontrado para borrar' });
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