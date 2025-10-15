// d:/desarrollos/countries2/backend/services/baseService.js
const db = require('../db/database');

class BaseService {
  constructor(tableName) {
    if (!tableName) {
      throw new Error('Se requiere un nombre de tabla para el servicio base.');
    }
    this.tableName = tableName;
  }

  getCount() {
    const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`);
    return stmt.get();
  }

  getAll(columns = ['*'], orderBy = 'id') {
    const columnList = columns.join(', ');
    const stmt = db.prepare(`SELECT ${columnList} FROM ${this.tableName} ORDER BY ${orderBy}`);
    return stmt.all();
  }

  getById(id, columns = ['*']) {
    const columnList = columns.join(', ');
    const stmt = db.prepare(`SELECT ${columnList} FROM ${this.tableName} WHERE id = ?`);
    return stmt.get(id);
  }

  create(data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map(() => '?').join(', ');

    const stmt = db.prepare(`INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders})`);
    return stmt.run(values);
  }

  update(id, data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const setClause = columns.map(col => `${col} = ?`).join(', ');

    if (columns.length === 0) {
      // No hay nada que actualizar, devuelve un resultado sin cambios.
      return { changes: 0 };
    }

    const stmt = db.prepare(`UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`);
    return stmt.run([...values, id]);
  }

  remove(id) {
    const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`);
    return stmt.run(id);
  }
}

module.exports = BaseService;