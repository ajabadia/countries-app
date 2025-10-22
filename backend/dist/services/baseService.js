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
    constructor(tableName, searchableFields = []) {
        this.tableName = tableName;
        this.searchableFields = searchableFields;
        if (!tableName) {
            throw new Error('Se requiere un nombre de tabla para el servicio.');
        }
        // La conexión a la BD se obtendrá de forma asíncrona en cada método.
    }
    /**
     * Obtiene todos los registros de la tabla con opciones de paginación, orden y búsqueda.
     * @param options Opciones de consulta.
     * @returns Un objeto con los datos y el total de registros que coinciden con la búsqueda.
     */
    async getAll(options = {}) {
        const db = await getDB();
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
        const db = await getDB();
        const cols = columns.join(', ');
        return db.prepare(`SELECT ${cols} FROM ${this.tableName} WHERE id = ?`).get(id);
    }
    /**
     * Encuentra el primer registro que coincide con un conjunto de condiciones.
     * @param criteria Un objeto donde las claves son columnas y los valores son los que se deben buscar.
     * @returns La entidad encontrada o `undefined` si no existe.
     */
    async findOneBy(criteria) {
        const db = await getDB();
        const columns = Object.keys(criteria);
        if (columns.length === 0)
            return undefined;
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
        const db = await getDB();
        return db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id);
    }
    /**
     * Elimina múltiples registros por sus IDs.
     * @param ids Un array de IDs de los registros a eliminar.
     * @returns El resultado de la ejecución de la consulta.
     */
    async removeMany(ids) {
        const db = await getDB();
        if (!Array.isArray(ids) || ids.length === 0) {
            // Devuelve un resultado que no indica cambios si el array está vacío.
            return { changes: 0, lastInsertRowid: 0 };
        }
        // Crea los placeholders (?) para la consulta SQL
        const placeholders = ids.map(() => '?').join(',');
        const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id IN (${placeholders})`);
        return stmt.run(...ids);
    }
    /**
     * Crea un nuevo registro.
     * @param data Objeto con los datos a insertar.
     * @returns La entidad recién creada.
     */
    async create(data) {
        const db = await getDB();
        const columns = Object.keys(data);
        const values = Object.values(data);
        const placeholders = columns.map(() => '?').join(', ');
        const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
        const result = db.prepare(sql).run(...values);
        // Devolvemos la entidad completa recién creada
        return (await this.getById(Number(result.lastInsertRowid)));
    }
    /**
     * Actualiza un registro por su ID.
     * @param id El ID del registro a actualizar.
     * @param data Objeto con los datos a actualizar.
     */
    async update(id, data) {
        const db = await getDB();
        const columns = Object.keys(data);
        if (columns.length === 0)
            throw new Error('No hay datos para actualizar.');
        const values = Object.values(data);
        const setClause = columns.map(col => `${col} = ?`).join(', ');
        const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
        db.prepare(sql).run(...values, id);
        // Devolvemos la entidad completa actualizada
        return (await this.getById(id));
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