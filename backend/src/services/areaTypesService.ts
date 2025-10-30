// backend/services/areaTypesService.ts
import BaseService from './baseService.js';
import type { AreaType } from '../types/areaTypes.types.js';

/**
 * Servicio para la entidad 'AreaType'.
 * Hereda toda la lógica CRUD de BaseService.
 */
class AreaTypesService extends BaseService<AreaType> {
  constructor() {
    super('area_types', ['area_id', 'area_type']);
  }
}

export default new AreaTypesService();