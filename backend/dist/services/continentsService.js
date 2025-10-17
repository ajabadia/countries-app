// backend/services/continentsService.ts
import BaseService from './baseService.js';
/**
 * Servicio para la entidad 'Continent'.
 * Hereda toda la lógica CRUD de BaseService.
 */
class ContinentsService extends BaseService {
    constructor() {
        super('continents', ['defaultname']);
    }
}
export default new ContinentsService();
//# sourceMappingURL=continentsService.js.map