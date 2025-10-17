// backend/services/languagesService.ts
import BaseService from './baseService.js';
/**
 * Servicio para la entidad 'Language'.
 * Hereda toda la lógica CRUD de BaseService.
 */
class LanguagesService extends BaseService {
    constructor() {
        super('languages', ['name']);
    }
}
export default new LanguagesService();
//# sourceMappingURL=languagesService.js.map