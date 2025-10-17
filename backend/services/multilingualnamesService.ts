// backend/services/multilingualnamesService.ts
import BaseService from './baseService.js';
import type { MultilingualName } from '../types/multilingualname.types.js';

/**
 * Servicio para la entidad 'MultilingualName'.
 * Hereda toda la lógica CRUD de BaseService.
 */
class MultilingualnamesService extends BaseService<MultilingualName> {
  constructor() {
    super('multilingualnames', ['value']);
  }

  /**
   * Encuentra todos los nombres multilingües para una entidad específica.
   * @param entityId El ID de la entidad (p. ej., el ID de un país).
   * @returns Un array de nombres multilingües.
   */
  public findByEntityId(entityId: string): MultilingualName[] {
    const sql = `SELECT * FROM ${this.tableName} WHERE entity_id = ?`;
    return this.db.prepare(sql).all(entityId) as MultilingualName[];
  }
}

export default new MultilingualnamesService();