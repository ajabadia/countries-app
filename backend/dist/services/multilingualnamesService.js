// backend/services/multilingualnamesService.ts
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
    findByEntityId(entityId) {
        const sql = `SELECT * FROM ${this.tableName} WHERE entity_id = ?`;
        return this.db.prepare(sql).all(entityId);
    }
}
export default new MultilingualnamesService();
//# sourceMappingURL=multilingualnamesService.js.map