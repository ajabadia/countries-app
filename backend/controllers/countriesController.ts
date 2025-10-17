// backend/controllers/countriesController.ts
import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createCrudController } from './baseController.js';
import countriesService from '../services/countriesService.js';
import multilingualnamesService from '../services/multilingualnamesService.js';
import type { Country } from '../types/country.types.js';
import { NotFoundError } from '../errors/httpErrors.js';

// Función para sanitizar el body, extrayendo solo las propiedades permitidas para Country.
const sanitizeCountry = (body: any): Partial<Country> => {
  const { defaultname, alpha2may, alpha3may, numeric } = body;
  const sanitizedData: Partial<Country> = {};
  if (defaultname !== undefined) sanitizedData.defaultname = defaultname;
  if (alpha2may !== undefined) sanitizedData.alpha2may = alpha2may;
  if (alpha3may !== undefined) sanitizedData.alpha3may = alpha3may;
  if (numeric !== undefined) sanitizedData.numeric = numeric;
  return sanitizedData;
};
const {
  getAll: getAllCountries,
  getById: getCountryById,
  create: createCountry,
  update: updateCountry,
  delete: deleteCountry,
} = createCrudController(countriesService, 'Country', sanitizeCountry);

/**
 * Obtiene todas las traducciones para un país específico.
 */
const getCountryTranslations = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // 1. Verificar que el país existe para devolver un 404 si no.
  const country = countriesService.getById(id);
  if (!country) {
    throw new NotFoundError(`Country with id ${id} not found`);
  }

  // 2. Obtener las traducciones para ese entity_id.
  const translations = multilingualnamesService.findByEntityId(id);
  res.json(translations);
});

export { getAllCountries, getCountryById, createCountry, updateCountry, deleteCountry, getCountryTranslations };