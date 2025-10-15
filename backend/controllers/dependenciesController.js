﻿// controllers/dependenciesController.js
const asyncHandler = require('express-async-handler');
const dependenciesService = require('../services/dependenciesService.js');

const getCount = asyncHandler(async (req, res) => {
  const result = dependenciesService.getCount();
  res.json(result);
});

const getAll = asyncHandler(async (req, res) => {
  const result = dependenciesService.getAll(['id', 'parent_id', 'dependent_id'], 'id');
  res.json(result);
});

const getById = asyncHandler(async (req, res) => {
  const item = dependenciesService.getById(req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Dependencia no encontrada' });
  }
  res.json(item);
});

const create = asyncHandler(async (req, res) => {
  const { parent_id, dependent_id } = req.body;
  if (!parent_id || !dependent_id) {
    return res.status(400).json({ error: 'Los campos parent_id y dependent_id son obligatorios' });
  }
  const result = dependenciesService.create({ parent_id, dependent_id });
  const newItem = dependenciesService.getById(result.lastInsertRowid);
  res.status(201).json(newItem);
});

const update = asyncHandler(async (req, res) => {
  const dataToUpdate = {};
  if (req.body.parent_id !== undefined) dataToUpdate.parent_id = req.body.parent_id;
  if (req.body.dependent_id !== undefined) dataToUpdate.dependent_id = req.body.dependent_id;

  if (Object.keys(dataToUpdate).length === 0) {
    return res.status(400).json({ error: 'Se requiere al menos un campo para actualizar' });
  }

  const info = dependenciesService.update(req.params.id, dataToUpdate);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Dependencia no encontrada' });
  }
  const updatedItem = dependenciesService.getById(req.params.id);
  res.json(updatedItem);
});

const remove = asyncHandler(async (req, res) => {
  const info = dependenciesService.remove(req.params.id);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Dependencia no encontrada para borrar' });
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