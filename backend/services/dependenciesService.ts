// backend/services/dependenciesService.ts
import BaseService from './baseService.js';
import type { Dependency } from '../types/dependency.types.js';

/**
 * Servicio para la entidad 'Dependency'.
 * Hereda toda la lógica CRUD de BaseService.
 */
class DependenciesService extends BaseService<Dependency> {
  constructor() {
    super('dependencies', ['parent_id', 'dependent_id']);
  }
}

export default new DependenciesService();