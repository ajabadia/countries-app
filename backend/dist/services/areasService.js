// backend/services/areasService.ts
import BaseService from './baseService.js';
/**
 * Servicio para la entidad 'Area'.
 * Hereda toda la lógica CRUD de BaseService.
 */
class AreasService extends BaseService {
    constructor() {
        super('areas', ['defaultname']);
    }
}
export default new AreasService();
//# sourceMappingURL=areasService.js.map