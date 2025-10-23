// backend/controllers/areasController.ts
import { createCrudController } from './baseController.js';
import areasService from '../services/areasService.js';
import type { Area } from '../types/area.types.js';

// Función para sanitizar el body, extrayendo solo las propiedades permitidas para Area.
const sanitizeArea = (body: any): Partial<Area> => {
  const { id, defaultname } = body;
  const sanitizedData: Partial<Area> = {};
  if (id !== undefined) sanitizedData.id = id;
  if (defaultname !== undefined) sanitizedData.defaultname = defaultname;
  return sanitizedData;
};

const {
  getAll: getAllAreas,
  getById: getAreaById,
  create: createArea,
  update: updateArea,
  delete: deleteArea,
  removeMany: deleteManyAreas,
} = createCrudController(areasService, 'Area', sanitizeArea);

export { getAllAreas, getAreaById, createArea, updateArea, deleteArea, deleteManyAreas };