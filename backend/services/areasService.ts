// backend/services/areasService.ts
import BaseService from './baseService.js';
import type { Area } from '../types/area.types.js';

/**
 * Servicio para la entidad 'Area'.
 * Hereda toda la lógica CRUD de BaseService.
 */
class AreasService extends BaseService<Area> {
  constructor() {
    super('areas', ['defaultname']);
  }
}

export default new AreasService();