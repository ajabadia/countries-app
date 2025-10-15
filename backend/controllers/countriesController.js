﻿// D:/desarrollos/countries2/backend/controllers/countriesController.js

const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const countriesService = require('../services/countriesService');

const getCountriesCount = asyncHandler(async (req, res) => {
  const result = countriesService.getCount();
  res.json(result);
});

const getAllCountries = asyncHandler(async (req, res) => {
  // Extraemos y saneamos los parámetros de la query
  const options = {
    page: Math.max(1, parseInt(req.query.page, 10) || 1),
    pageSize: Math.max(1, parseInt(req.query.pageSize, 10) || 10),
    search: req.query.search ? req.query.search.trim() : null,
    sortKey: req.query.sortKey,
    sortOrder: req.query.sortOrder,
  };
  
  const result = countriesService.getAllPaginated(options);
  res.json(result);
});

const getCountryById = asyncHandler(async (req, res) => {
  const country = countriesService.getById(req.params.id, ['id', 'alpha2may', 'alpha3may', 'numeric', 'defaultname']);
  if (!country) {
    return res.status(404).json({ error: 'País no encontrado' });
  }
  res.json(country);
});

const createCountry = asyncHandler(async (req, res) => {
  // La validación sigue siendo responsabilidad del controlador
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, alpha2may, alpha3may, numeric, defaultname } = req.body;
  const countryData = {
    id,
    alpha2may: alpha2may ?? '',
    alpha3may: alpha3may ?? '',
    numeric: numeric ?? '',
    defaultname
  };
  countriesService.create(countryData);
  
  // Devolvemos el objeto recién creado
  const created = countriesService.getById(id);
  res.status(201).json(created);
});

const updateCountry = asyncHandler(async (req, res) => {
  // La validación sigue siendo responsabilidad del controlador
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { alpha2may, alpha3may, numeric, defaultname } = req.body;
  const countryData = {
    alpha2may: alpha2may ?? '',
    alpha3may: alpha3may ?? '',
    numeric: numeric ?? '',
    defaultname
  };
  const info = countriesService.update(req.params.id, countryData);

  if (info.changes === 0) {
    return res.status(404).json({ error: 'País no encontrado' });
  }
  
  const updated = countriesService.getById(req.params.id);
  res.json(updated);
});

const deleteCountry = asyncHandler(async (req, res) => {
  const info = countriesService.remove(req.params.id);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'País no encontrado para borrar' });
  }
  res.status(204).end();
});

module.exports = {
  getCountriesCount,
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry
};