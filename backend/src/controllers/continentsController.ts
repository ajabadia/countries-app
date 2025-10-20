// backend/controllers/continentsController.ts
import { createCrudController } from './baseController.js';
import continentsService from '../services/continentsService.js';
import type { Continent } from '../types/continent.types.js';

const sanitizeContinent = (body: any): Partial<Continent> => {
  const { defaultname } = body;
  const sanitizedData: Partial<Continent> = {};
  if (defaultname !== undefined) sanitizedData.defaultname = defaultname;
  return sanitizedData;
};
const {
  getAll: getAllContinents,
  getById: getContinentById,
  create: createContinent,
  update: updateContinent,
  delete: deleteContinent,
} = createCrudController(continentsService, 'Continent', sanitizeContinent);
export {
  getAllContinents,
  getContinentById,
  createContinent,
  updateContinent,
  deleteContinent,
};