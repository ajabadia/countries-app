// backend/services/baseService.ts
import { getDB } from '../db/database.js';
/**
 * Clase base para servicios que interactúan con la base de datos.
 * Proporciona métodos CRUD genéricos y está fuertemente tipada.
 * @template T El tipo de la entidad que maneja el servicio. Debe tener una propiedad `id`.
 */
export default class BaseService {
    tableName;
    searchableFields;
    /**
     * @param tableName El nombre de la tabla en la base de datos.
     * @param searchableFields Un array de campos en los que buscar por defecto.
     */
    constructor(tableName, searchableFields = []) {
        this.tableName = tableName;
        this.searchableFields = searchableFields;
        if (!tableName) {
            throw new Error('Se requiere un nombre de tabla para el servicio.');
        }
    }
    async getDbInstance() {
        return getDB();
    }
    /**
     * Obtiene el número total de registros en la tabla.
     * @returns Una promesa que resuelve al número total de registros.
     */
    async getCount() {
        const db = await this.getDbInstance();
        const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`);
        const result = stmt.get();
        return result.count;
    }
    /**
     * Obtiene todos los registros de la tabla con opciones de paginación, orden y búsqueda.
     * @param options Opciones de consulta.
     * @returns Un objeto con los datos y el total de registros que coinciden con la búsqueda.
     */
    async getAll(options = {}) {
        const db = await this.getDbInstance();
        const { columns = ['*'], orderBy = 'id', orderDir = 'asc', pageSize, offset, search = null, searchFields } = options;
        // --- Validación para prevenir SQL Injection ---
        const validColumnsInfo = db.prepare(`PRAGMA table_info(${this.tableName})`).all();
        const validColumns = validColumnsInfo.map(c => c.name);
        const safeOrderBy = validColumns.includes(orderBy) ? orderBy : 'id';
        const safeOrderDir = ['asc', 'desc'].includes(orderDir.toLowerCase()) ? orderDir.toUpperCase() : 'ASC';
        const cols = columns.join(', ');
        const { clause: whereClause, params: searchParams } = this._buildWhereClause(search, searchFields);
        const totalQuery = `SELECT COUNT(*) as total FROM ${this.tableName} ${whereClause}`;
        const { total } = db.prepare(totalQuery).get(...searchParams);
        let query = `SELECT ${cols} FROM ${this.tableName} ${whereClause} ORDER BY ${safeOrderBy} ${safeOrderDir}`;
        const queryParams = [...searchParams];
        if (pageSize != null) {
            query += ` LIMIT ?`;
            queryParams.push(pageSize);
        }
        if (offset != null) {
            query += ` OFFSET ?`;
            queryParams.push(offset);
        }
        const rows = db.prepare(query).all(...queryParams);
        return { data: rows, total };
    }
    /**
     * Obtiene un registro por su ID.
     * @param id El ID del registro.
     * @param columns Las columnas a seleccionar.
     * @returns La entidad encontrada o `undefined` si no existe.
     */
    async getById(id, columns = ['*']) {
        const db = await this.getDbInstance();
        const cols = columns.join(', ');
        return db.prepare(`SELECT ${cols} FROM ${this.tableName} WHERE id = ?`).get(id);
    }
    /**
     * Encuentra el primer registro que coincide con un conjunto de condiciones.
     * @param criteria Un objeto donde las claves son columnas y los valores son los que se deben buscar.
     * @returns La entidad encontrada o `undefined` si no existe.
     */
    async findOneBy(criteria) {
        const db = await this.getDbInstance();
        const columns = Object.keys(criteria);
        if (columns.length === 0)
            return null;
        const values = Object.values(criteria);
        const whereClause = columns.map(col => `${col} = ?`).join(' AND ');
        const sql = `SELECT * FROM ${this.tableName} WHERE ${whereClause} LIMIT 1`;
        return db.prepare(sql).get(...values);
    }
    /**
     * Elimina un registro por su ID.
     * @param id El ID del registro a eliminar.
     */
    async remove(id) {
        const db = await this.getDbInstance();
        const result = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id);
        return { changes: result.changes };
    }
    /**
     * Elimina múltiples registros por sus IDs.
     * @param ids Un array de IDs de los registros a eliminar.
     * @returns El resultado de la ejecución de la consulta.
     */
    async removeMany(ids) {
        const db = await this.getDbInstance();
        if (!Array.isArray(ids) || ids.length === 0) {
            // Devuelve un resultado que no indica cambios si el array está vacío.
            return { changes: 0 };
        }
        // Crea los placeholders (?) para la consulta SQL
        const placeholders = ids.map(() => '?').join(',');
        const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id IN (${placeholders})`);
        const result = stmt.run(...ids);
        return { changes: result.changes };
    }
    /**
     * Crea un nuevo registro.
     * @param data Objeto con los datos a insertar.
     * @returns La entidad recién creada.
     */
    async create(data) {
        const db = await this.getDbInstance();
        const columns = Object.keys(data);
        const values = Object.values(data);
        const placeholders = columns.map(() => '?').join(', ');
        // ✅ OPTIMIZACIÓN: Se usa RETURNING * para obtener el registro creado en una sola consulta.
        const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`;
        // Usamos .get() porque INSERT...RETURNING devuelve una única fila.
        return db.prepare(sql).get(...values);
    }
    /**
     * Actualiza un registro por su ID.
     * @param id El ID del registro a actualizar.
     * @param data Objeto con los datos a actualizar.
     */
    async update(id, data) {
        const db = await this.getDbInstance();
        const columns = Object.keys(data);
        if (columns.length === 0)
            throw new Error('No hay datos para actualizar.');
        const values = Object.values(data);
        const setClause = columns.map(col => `${col} = ?`).join(', ');
        // ✅ OPTIMIZACIÓN: Se usa RETURNING * para obtener el registro actualizado en una sola consulta.
        const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ? RETURNING *`;
        // Usamos .get() porque UPDATE...RETURNING en una sola fila devuelve una única fila.
        return db.prepare(sql).get(...values, id);
    }
    _buildWhereClause(search, searchFields) {
        const fieldsToSearch = searchFields && searchFields.length > 0 ? searchFields : this.searchableFields;
        if (!search || fieldsToSearch.length === 0) {
            return { clause: '', params: [] };
        }
        const clause = `WHERE ${fieldsToSearch.map(field => `${field} LIKE ?`).join(' OR ')}`;
        const params = fieldsToSearch.map(() => `%${search}%`);
        return { clause, params };
    }
}
//# sourceMappingURL=baseService.js.map