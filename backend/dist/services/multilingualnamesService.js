// backend/services/multilingualnamesService.ts
import { getDB } from '../db/database.js';
import BaseService from './baseService.js';
/**
 * Servicio para la entidad 'MultilingualName'.
 * Hereda toda la lógica CRUD de BaseService.
 */
class MultilingualnamesService extends BaseService {
    constructor() {
        super('multilingualnames', ['value']);
    }
    /**
     * Encuentra todos los nombres multilingües para una entidad específica.
     * @param entityId El ID de la entidad (p. ej., el ID de un país).
     * @returns Un array de nombres multilingües.
     */
    async findByEntityId(entityId) {
        const db = await getDB();
        const sql = `SELECT * FROM ${this.tableName} WHERE entity_id = ?`;
        return db.prepare(sql).all(entityId);
    }
}
export default new MultilingualnamesService();
//# sourceMappingURL=multilingualnamesService.js.map