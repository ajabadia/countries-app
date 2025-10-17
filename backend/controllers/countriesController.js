﻿﻿﻿// d:/desarrollos/countries2/backend/controllers/countriesController.js
const asyncHandler = require('express-async-handler');
const countriesService = require('../services/countriesService.js');

const getAllCountries = asyncHandler(async (req, res) => {
  // Extraemos los parámetros de la query para paginación, búsqueda y ordenación
  const { page, pageSize, search, sort, order } = req.query;
 
  // ✅ REFACTOR: Construimos el objeto de opciones para el método genérico getAll.
  // Esto alinea el controlador con la nueva arquitectura de BaseService.
  const options = {
    page: page ? parseInt(page, 10) : undefined,
    pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
    search: search || null,
    orderBy: sort, // El frontend envía 'sort'
    orderDir: order, // El frontend envía 'order'
  };
 
  // Llamamos al método heredado de BaseService
  const result = countriesService.getAll(options);
 
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