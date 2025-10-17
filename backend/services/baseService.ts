// backend/services/baseService.ts
import { getDB } from '../db/database.js';
import type { Database, RunResult } from 'better-sqlite3';

/**
 * Opciones de consulta para el método `getAll`.
 */
export interface GetAllOptions {
  columns?: string[];
  orderBy?: string;
  orderDir?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
  search?: string | null;
}

/**
 * Representa una cláusula WHERE y sus parámetros.
 */
export interface WhereClause {
  clause: string;
  params: (string | number)[];
}

/**
 * Clase base para servicios que interactúan con la base de datos.
 * Proporciona métodos CRUD genéricos y está fuertemente tipada.
 * @template T El tipo de la entidad que maneja el servicio. Debe tener una propiedad `id`.
 */
export default class BaseService<T extends { id: number | string }> {
  protected db: Database;

  constructor(
    protected tableName: string,
    protected searchableFields: string[] = []
  ) {
    if (!tableName) {
      throw new Error('Se requiere un nombre de tabla para el servicio.');
    }
    this.db = getDB();
  }

  /**
   * Obtiene todos los registros de la tabla con opciones de paginación, orden y búsqueda.
   * @param options Opciones de consulta.
   * @returns Un objeto con los datos y el total de registros que coinciden con la búsqueda.
   */
  getAll(options: GetAllOptions = {}): { data: T[]; total: number } {
    const { columns = ['*'], orderBy = 'id', orderDir = 'asc', limit, offset, search = null } = options;

    // --- Validación para prevenir SQL Injection ---
    const validColumnsInfo = this.db.prepare(`PRAGMA table_info(${this.tableName})`).all() as { name: string }[];
    const validColumns = validColumnsInfo.map(c => c.name);
    const safeOrderBy = validColumns.includes(orderBy) ? orderBy : 'id';
    const safeOrderDir = ['asc', 'desc'].includes(orderDir.toLowerCase()) ? orderDir.toUpperCase() : 'ASC';

    const cols = columns.join(', ');
    const { clause: whereClause, params: searchParams } = this._buildWhereClause(search);

    const totalQuery = `SELECT COUNT(*) as total FROM ${this.tableName} ${whereClause}`;
    const { total } = this.db.prepare(totalQuery).get(...searchParams) as { total: number };

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

    const rows = this.db.prepare(query).all(...queryParams) as T[];
    return { data: rows, total };
  }

  /**
   * Obtiene un registro por su ID.
   * @param id El ID del registro.
   * @param columns Las columnas a seleccionar.
   * @returns La entidad encontrada o `undefined` si no existe.
   */
  getById(id: number | string, columns: string[] = ['*']): T | undefined {
    const cols = columns.join(', ');
    return this.db.prepare(`SELECT ${cols} FROM ${this.tableName} WHERE id = ?`).get(id) as T | undefined;
  }

  /**
   * Elimina un registro por su ID.
   * @param id El ID del registro a eliminar.
   */
  remove(id: number | string): RunResult {
    return this.db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).run(id);
  }

  /**
   * Crea un nuevo registro.
   * @param data Objeto con los datos a insertar.
   */
  create(data: Partial<T>): RunResult {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map(() => '?').join(', ');
    const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
    return this.db.prepare(sql).run(...values);
  }

  /**
   * Actualiza un registro por su ID.
   * @param id El ID del registro a actualizar.
   * @param data Objeto con los datos a actualizar.
   */
  update(id: number | string, data: Partial<T>): RunResult {
    const columns = Object.keys(data);
    if (columns.length === 0) throw new Error('No hay datos para actualizar.');

    const values = Object.values(data);
    const setClause = columns.map(col => `${col} = ?`).join(', ');
    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
    return this.db.prepare(sql).run(...values, id);
  }

  private _buildWhereClause(search: string | null): WhereClause {
    if (!search || this.searchableFields.length === 0) {
      return { clause: '', params: [] };
    }
    const clause = `WHERE ${this.searchableFields.map(field => `${field} LIKE ?`).join(' OR ')}`;
    const params = this.searchableFields.map(() => `%${search}%`);
    return { clause, params };
  }
}
