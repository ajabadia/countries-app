// backend/services/countriesService.ts
import BaseService from './baseService.js';
/**
 * Servicio específico para la entidad 'Country'.
 * Hereda toda la lógica CRUD de BaseService y la especializa para 'Country'.
 */
class CountriesService extends BaseService {
    constructor() {
        // Pasamos el nombre de la tabla y los campos de búsqueda al constructor padre.
        // El tipado genérico <Country> asegura que todos los métodos (getAll, getById, etc.)
        // trabajarán con objetos de tipo Country.
        const searchableFields = ['id', 'defaultname', 'alpha2may', 'alpha3may', 'numeric'];
        super('countries', searchableFields);
    }
}
export default new CountriesService();
//# sourceMappingURL=countriesService.js.map