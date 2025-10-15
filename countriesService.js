// backend/services/countriesService.js
const BaseService = require('./baseService');

class CountriesService extends BaseService {
  constructor() {
    // Llama al constructor de BaseService con el nombre de la tabla
    super('countries');
  }

  /**
   * Obtiene una lista paginada y filtrada de países.
   * @param {object} options - Opciones de paginación, búsqueda y orden.
   * @param {number} options.page - Número de página.
   * @param {number} options.pageSize - Tamaño de la página.
   * @param {string} options.search - Término de búsqueda.
   * @param {string} options.sortKey - Columna para ordenar.
   * @param {string} options.sortOrder - Dirección de orden (ASC/DESC).
   * @returns {{data: any[], total: number}}
   */
  getAllPaginated({ page = 1, pageSize = 10, search = null, sortKey = 'defaultname', sortOrder = 'ASC' }) {
    const offset = (page - 1) * pageSize;
    const allowedSorts = ['defaultname', 'alpha2may', 'alpha3may', 'numeric'];
    const validSortKey = allowedSorts.includes(sortKey) ? sortKey : 'defaultname';
    const validSortOrder = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const whereClause = search ? `WHERE defaultname LIKE '%' || ? || '%'` : 'WHERE 1=1';
    const searchParam = search ? [search] : [];

    const data = this.db.prepare(`
      SELECT id, alpha2may, alpha3may, numeric, defaultname
      FROM ${this.tableName}
      ${whereClause}
      ORDER BY ${validSortKey} COLLATE NOCASE ${validSortOrder}
      LIMIT ? OFFSET ?;
    `).all(...searchParam, pageSize, offset);

    const { total } = this.db.prepare(`
      SELECT COUNT(*) as total
      FROM ${this.tableName}
      ${whereClause}
    `).get(...searchParam);

    return { data, total };
  }
}

module.exports = new CountriesService();