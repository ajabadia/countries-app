 // backend/services/baseService.js
const { getDB } = require('../db/database');
 
/**
 * Clase base para servicios que interactúan con la base de datos.
 * Proporciona métodos CRUD genéricos.
 */
class BaseService {
  constructor(tableName, searchableFields = []) {
    if (!tableName) {
      throw new Error('Se requiere un nombre de tabla para el servicio.');
    }
    this.tableName = tableName;
    this.db = getDB();
    // Lista de campos en los que se puede buscar para este servicio.
    this.searchableFields = searchableFields;
  }
 
  /**
   * Obtiene el número total de registros en la tabla.
   * @returns {{total: number}}
   */
  getCount() {
    // Este método ahora es privado porque la lógica de búsqueda afecta al total.
    // Se llamará desde getAll.
    // const { total } = this.db.prepare(`SELECT COUNT(*) as total FROM ${this.tableName}`).get();
    // return { total: total || 0 };
    throw new Error('getCount es ahora un método interno. El total se devuelve con getAll.');
  }

  _buildWhereClause(search) {
    if (!search || this.searchableFields.length === 0) {
      return { clause: '', params: [] };
    }
    const clause = `WHERE ${this.searchableFields.map(field => `${field} LIKE ?`).join(' OR ')}`;
    const params = this.searchableFields.map(() => `%${search}%`);
    return { clause, params };
  }
 
  /**
   * Obtiene todos los registros de la tabla.
   * @param {object} [options] - Opciones de consulta.
   * @param {string[]} [options.columns=['*']] - Las columnas a seleccionar.
   * @param {string} [options.orderBy='id'] - La columna por la que ordenar.
   * @param {'asc' | 'desc'} [options.orderDir='asc'] - La dirección de ordenamiento.
   * @param {number} [options.limit] - Límite de registros a devolver.
   * @param {number} [options.offset] - Desplazamiento para paginación.
   * @param {string | null} [options.search] - Término de búsqueda.
   * @template T
   * @returns {{data: T[], total: number}}
   */
  getAll(options = {}) {
    const { columns = ['*'], orderBy = 'id', orderDir = 'asc', limit, offset, search = null } = options;
 
    // --- Validación para prevenir SQL Injection ---
    // Obtenemos las columnas válidas de la tabla para crear una lista blanca.
    const validColumns = this.db.prepare(`PRAGMA table_info(${this.tableName})`).all().map(c => c.name);
    const safeOrderBy = validColumns.includes(orderBy) ? orderBy : 'id';
    const safeOrderDir = ['asc', 'desc'].includes(orderDir.toLowerCase()) ? orderDir.toUpperCase() : 'ASC';
    // --- Fin de la validación ---
 
    const cols = columns.join(', ');
    const { clause: whereClause, params: searchParams } = this._buildWhereClause(search);
 
    // Obtenemos el total de registros que coinciden con la búsqueda
    const totalQuery = `SELECT COUNT(*) as total FROM ${this.tableName} ${whereClause}`;
    const { total } = this.db.prepare(totalQuery).get(...searchParams);

    let query = `SELECT ${cols} FROM ${this.tableName} ${whereClause} ORDER BY ${safeOrderBy} ${safeOrderDir}`;
    const queryParams = [...searchParams];
    if (limit != null) {
      query += ` LIMIT ?`;
      queryParams.push(limit);
    }
    if (offset != null) {
      query += ` OFFSET ?`;
      queryParams.push(offset);
    }
 
    const rows = this.db.prepare(query).all(...queryParams);
    return { data: rows, total };
  }
 
  /**
   * Obtiene un registro por su ID.
   * @param {number | string} id - El ID del registro.
   * @param {string[]} [columns=['*']] - Las columnas a seleccionar.
   * @template T
   * @returns {T | null}
   */
  getById(id, columns = ['*']) {
    const cols = columns.join(', ');
    return this.db.prepare(`SELECT ${cols} FROM ${this.tableName} WHERE id = ?`).get(id);
  }
 
  /**
   * Elimina un registro por su ID.
   * @param {number | string} id - El ID del registro a eliminar.
   * @returns {import('better-sqlite3').RunResult}
   */
  remove(id) {
    return this.db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id);
  }
 
  /**
   * Crea un nuevo registro.
   * @param {object} data - Objeto con los datos a insertar (llave: valor).
   * @returns {import('better-sqlite3').RunResult}
   */
  create(data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map(() => '?').join(', ');
    const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
 
    return this.db.prepare(sql).run(...values);
  }
 
  /**
   * Actualiza un registro por su ID.
   * @param {number | string} id - El ID del registro a actualizar.
   * @param {object} data - Objeto con los datos a actualizar.
   * @returns {import('better-sqlite3').RunResult}
   */
  update(id, data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const setClause = columns.map(col => `${col} = ?`).join(', ');
 
    if (columns.length === 0) {
      throw new Error('No hay datos para actualizar.');
    }
 
    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
    return this.db.prepare(sql).run(...values, id);
  }
}
 
module.exports = BaseService;