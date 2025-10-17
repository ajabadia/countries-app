// d:/desarrollos/countries2/backend/services/countriesService.js
const BaseService = require('./baseService');

/**
 * ✅ REFACTOR: El servicio de países ahora extiende el BaseService genérico.
 * Esto elimina el código duplicado y hereda los métodos estándar (getAll, getById, etc.).
 * La lógica de búsqueda y paginación ahora está centralizada en la clase base.
 */
class CountriesService extends BaseService {
  constructor() {
    // Pasamos el nombre de la tabla y los campos de búsqueda al constructor padre.
    super('countries', ['id', 'defaultname', 'alpha2may', 'alpha3may']);
  }
}

module.exports = new CountriesService();