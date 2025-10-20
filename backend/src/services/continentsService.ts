// backend/services/continentsService.ts
import BaseService from './baseService.js';
import type { Continent } from '../types/continent.types.js';

/**
 * Servicio para la entidad 'Continent'.
 * Hereda toda la lógica CRUD de BaseService.
 */
class ContinentsService extends BaseService<Continent> {
  constructor() {
    super('continents', ['defaultname']);
  }
}

export default new ContinentsService();