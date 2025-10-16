// backend/services/baseService.js
const { getDB } = require('../db/database');

/**
 * Clase base para servicios que interactúan con la base de datos.
 * Proporciona métodos CRUD genéricos.
 */
class BaseService {
  constructor(tableName) {
    if (!tableName) {
      throw new Error('Se requiere un nombre de tabla para el servicio.');
    }
    this.tableName = tableName;
    this.db = getDB();
  }

  /**
   * Obtiene el número total de registros en la tabla.
   * @returns {{total: number}}
   */
  getCount() {
    const { total } = this.db.prepare(`SELECT COUNT(*) as total FROM ${this.tableName}`).get();
    return { total: total || 0 };
  }

  /**
   * Obtiene todos los registros de la tabla.
   * @param {object} [options] - Opciones de consulta.
   * @param {string[]} [options.columns=['*']] - Las columnas a seleccionar.
   * @param {string} [options.orderBy='id'] - La columna por la que ordenar.
   * @param {'asc' | 'desc'} [options.orderDir='asc'] - La dirección de ordenamiento.
   * @param {number} [options.limit] - Límite de registros a devolver.
   * @param {number} [options.offset] - Desplazamiento para paginación.
   * @template T
   * @returns {{data: T[], total: number}}
   */
  getAll(options = {}) {
    const { columns = ['*'], orderBy = 'id', orderDir = 'asc', limit, offset } = options;

    // --- Validación para prevenir SQL Injection ---
    // Obtenemos las columnas válidas de la tabla para crear una lista blanca.
    const validColumns = this.db.prepare(`PRAGMA table_info(${this.tableName})`).all().map(c => c.name);
    const safeOrderBy = validColumns.includes(orderBy) ? orderBy : 'id';
    const safeOrderDir = ['asc', 'desc'].includes(orderDir.toLowerCase()) ? orderDir.toUpperCase() : 'ASC';
    // --- Fin de la validación ---

    const cols = columns.join(', ');
    const { total } = this.getCount(); // Obtenemos el total real de la tabla

    let query = `SELECT ${cols} FROM ${this.tableName} ORDER BY ${safeOrderBy} ${safeOrderDir}`;
    if (limit) query += ` LIMIT ${limit}`;
    if (offset) query += ` OFFSET ${offset}`;

    const rows = this.db.prepare(query).all();
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