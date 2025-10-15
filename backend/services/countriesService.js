// d:/desarrollos/countries2/backend/services/countriesService.js
const BaseService = require('./baseService');
const db = require('../db/database');

class CountriesService extends BaseService {
  constructor() {
    super('countries');
  }

  /**
   * Busca, pagina y ordena los países.
   * @param {object} options - Opciones de búsqueda y paginación.
   * @param {number} options.page - Número de página.
   * @param {number} options.pageSize - Tamaño de la página.
   * @param {string} options.search - Término de búsqueda.
   * @param {string} options.sortKey - Campo por el que ordenar.
   * @param {string} options.sortOrder - Dirección de ordenación ('ASC' o 'DESC').
   * @returns {{data: any[], total: number}} - Los países y el total de registros.
   */
  searchAndPaginate({ page = 1, pageSize = 10, search = null, sortKey = 'defaultname', sortOrder = 'ASC' }) {
    const offset = (page - 1) * pageSize;
    // Seguridad: solo permitir campos válidos para ordenar
    const allowedSorts = ['id', 'defaultname', 'alpha2may', 'alpha3may', 'numeric'];
    const validSortKey = allowedSorts.includes(sortKey) ? sortKey : 'defaultname';
    const validSortOrder = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const whereClause = search ? `WHERE defaultname LIKE '%' || ? || '%'` : '';
    const params = search ? [search] : [];

    const data = db.prepare(`
      SELECT id, alpha2may, alpha3may, numeric, defaultname FROM ${this.tableName}
      ${whereClause}
      ORDER BY ${validSortKey} COLLATE NOCASE ${validSortOrder}
      LIMIT ? OFFSET ?
    `).all(...params, pageSize, offset);

    const total = db.prepare(`SELECT COUNT(*) as total FROM ${this.tableName} ${whereClause}`).get(...params).total;

    return { data, total };
  }
}

module.exports = new CountriesService();