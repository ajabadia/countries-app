﻿// d:/desarrollos/countries2/backend/controllers/countriesController.js
const asyncHandler = require('express-async-handler');
const countriesService = require('../services/countriesService.js');

const getAllCountries = asyncHandler(async (req, res) => {
  // Extraemos los parámetros de la query para paginación, búsqueda y ordenación
  const {
    page = 1,
    pageSize = 10,
    search = null,
    sortKey = 'defaultname',
    sortOrder = 'asc',
  } = req.query;

  const result = countriesService.searchAndPaginate({
    page: parseInt(page, 10),
    pageSize: parseInt(pageSize, 10),
    search,
    sortKey,
    sortOrder,
  });

  res.json(result);
});

const getCountryById = asyncHandler(async (req, res) => {
  const country = countriesService.getById(req.params.id);
  if (country) {
    res.json(country);
  } else {
    res.status(404).json({ message: 'País no encontrado' });
  }
});

module.exports = {
  getAllCountries,
  getCountryById,
};