// File: d:\desarrollos\countries2\backend\src\controllers\dashboard.controller.ts | New File

import asyncHandler from 'express-async-handler';
import type { Request, Response } from 'express';
import countriesService from '../services/countriesService.js';
import usersService from '../services/usersService.js';
import languagesService from '../services/languagesService.js';
import continentsService from '../services/continentsService.js';
import areasService from '../services/areasService.js';
import areaTypesService from '../services/areaTypesService.js';
import dependenciesService from '../services/dependenciesService.js';
import multilingualnamesService from '../services/multilingualnamesService.js';

/**
 * @desc    Obtiene estadísticas agregadas para el dashboard.
 * @route   GET /api/admin/dashboard
 * @access  Private (Admin)
 */
const getStats = asyncHandler(async (req: Request, res: Response) => {
  // Usamos Promise.allSettled para asegurar que obtenemos un resultado
  // incluso si una de las consultas de conteo falla.
  const [
    countriesCount,
    usersCount,
    languagesCount,
    continentsCount,
    areasCount,
    areaTypesCount,
    dependenciesCount,
    multilingualnamesCount,
  ] = await Promise.allSettled([
    countriesService.getCount(),
    usersService.getCount(),
    languagesService.getCount(),
    continentsService.getCount(),
    areasService.getCount(),
    areaTypesService.getCount(),
    dependenciesService.getCount(),
    multilingualnamesService.getCount(),
  ]);

  res.json({
    countries: countriesCount.status === 'fulfilled' ? countriesCount.value : 0,
    users: usersCount.status === 'fulfilled' ? usersCount.value : 0,
    languages: languagesCount.status === 'fulfilled' ? languagesCount.value : 0,
    continents: continentsCount.status === 'fulfilled' ? continentsCount.value : 0,
    areas: areasCount.status === 'fulfilled' ? areasCount.value : 0,
    area_types: areaTypesCount.status === 'fulfilled' ? areaTypesCount.value : 0,
    dependencies: dependenciesCount.status === 'fulfilled' ? dependenciesCount.value : 0,
    multilingualnames: multilingualnamesCount.status === 'fulfilled' ? multilingualnamesCount.value : 0,
  });
});

export { getStats };