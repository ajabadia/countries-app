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
   * @param {string[]} columns - Las columnas a seleccionar.
   * @param {string} orderBy - La columna por la que ordenar.
   * @returns {{data: any[], total: number}}
   */
  getAll(columns = ['*'], orderBy = 'id') {
    const cols = columns.join(', ');
    const rows = this.db.prepare(`SELECT ${cols} FROM ${this.tableName} ORDER BY ${orderBy}`).all();
    return { data: rows, total: rows.length };
  }

  /**
   * Obtiene un registro por su ID.
   * @param {number | string} id - El ID del registro.
   * @param {string[]} columns - Las columnas a seleccionar.
   * @returns {any | null}
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