// backend/services/countriesService.js
const BaseService = require('./baseService');

/**
 * ✅ REFACTOR: The CountriesService now extends the generic BaseService.
 * This removes all duplicated code for pagination, searching, and sorting.
 * It now automatically inherits the standard getAll, getById, create, update, and delete methods.
 */
class CountriesService extends BaseService {
  constructor() {
    // Pass the table name and the fields allowed for searching and sorting to the parent constructor.
    super('countries', {
      searchableFields: ['defaultname'],
      sortableFields: ['defaultname', 'alpha2may', 'alpha3may', 'numeric']
    });
  }
}

module.exports = new CountriesService();