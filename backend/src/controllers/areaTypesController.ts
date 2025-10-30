// backend/controllers/areaTypesController.ts
import { createCrudController } from './baseController.js';
import areaTypesService from '../services/areaTypesService.js';
import type { AreaType } from '../types/areaTypes.types.js';

// Función para sanitizar el body, extrayendo solo las propiedades permitidas para AreaType.
const sanitizeAreaType = (body: any): Partial<AreaType> => {
  const { area_id, area_type } = body;
  const sanitizedData: Partial<AreaType> = {};
  if (area_id !== undefined) sanitizedData.area_id = area_id;
  if (area_type !== undefined) sanitizedData.area_type = area_type;
  return sanitizedData;
};

const {
  getAll: getAllAreaTypes,
  getById: getAreaTypeById,
  create: createAreaType,
  update: updateAreaType,
  delete: deleteAreaType,
  removeMany: deleteManyAreaTypes,
} = createCrudController(areaTypesService, 'AreaType', sanitizeAreaType);

export { getAllAreaTypes, getAreaTypeById, createAreaType, updateAreaType, deleteAreaType, deleteManyAreaTypes };