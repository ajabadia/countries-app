// backend/controllers/continentsController.ts
import { createCrudController } from './baseController.js';
import continentsService from '../services/continentsService.js';
import type { Continent } from '../types/continent.types.js';

const sanitizeContinent = (body: any): Partial<Continent> => {
  const { id, defaultname } = body;
  const sanitizedData: Partial<Continent> = {};
  if (id !== undefined) sanitizedData.id = id;
  if (defaultname !== undefined) sanitizedData.defaultname = defaultname;
  return sanitizedData;
};
const {
  getAll: getAllContinents,
  getById: getContinentById,
  create: createContinent,
  update: updateContinent,
  delete: deleteContinent,
  removeMany: deleteManyContinents,
} = createCrudController(continentsService, 'Continent', sanitizeContinent);
export {
  getAllContinents,
  getContinentById,
  createContinent,
  updateContinent,
  deleteContinent,
  deleteManyContinents,
};