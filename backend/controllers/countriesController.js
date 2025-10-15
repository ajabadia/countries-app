﻿// d:/desarrollos/countries2/backend/controllers/countriesController.js
const countriesService = require('../services/countriesService');

const getAllCountries = (req, res, next) => {
  try {
    const countries = countriesService.getAllCountries();
    res.json(countries);
  } catch (err) {
    next(err); // Pasa el error al middleware de manejo de errores
  }
};

const getCountryById = (req, res, next) => {
  try {
    const country = countriesService.getCountryById(req.params.id);
    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ message: 'País no encontrado' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
};