// backend/services/dependenciesService.ts
import BaseService from './baseService.js';
/**
 * Servicio para la entidad 'Dependency'.
 * Hereda toda la lógica CRUD de BaseService.
 */
class DependenciesService extends BaseService {
    constructor() {
        super('dependencies', ['parent_id', 'dependent_id']);
    }
}
export default new DependenciesService();
//# sourceMappingURL=dependenciesService.js.map