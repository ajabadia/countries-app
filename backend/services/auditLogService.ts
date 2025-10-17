// backend/services/auditLogService.ts

import { getDB } from '../db/database.js';
import BaseService from './baseService.js';
import type { AuditLog, AuditLogCreation } from '../types/auditLog.types.js';

/**
 * Servicio para la entidad 'AuditLog'.
 * Hereda la lógica CRUD de BaseService.
 */
class AuditLogService extends BaseService<AuditLog> {
  constructor() {
    super('audit_logs', ['eventType', 'level', 'details', 'ipAddress']);
  }

  /**
   * Registra un nuevo evento de auditoría en la base de datos.
   * @param logData Los datos del evento a registrar.
   */
  public async logEvent(logData: AuditLogCreation): Promise<void> {
    // Hacemos la llamada asíncrona pero no la esperamos en el controlador (fire-and-forget)
    // para no ralentizar la respuesta al usuario.
    await this.create(logData);
  }

  /**
   * Elimina los logs de auditoría más antiguos que una fecha dada.
   * @param dateString La fecha en formato YYYY-MM-DD.
   * @returns El resultado de la operación de la base de datos.
   */
  public async deleteOlderThan(dateString:string): Promise<import('better-sqlite3').RunResult> {
    const db = await getDB();
    const sql = `DELETE FROM ${this.tableName} WHERE timestamp < ?`;
    return db.prepare(sql).run(dateString);
  }
}

export default new AuditLogService();