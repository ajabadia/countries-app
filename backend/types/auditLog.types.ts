// backend/types/auditLog.types.ts

export interface AuditLog {
  id: number;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'CRITICAL';
  eventType: string;
  userId?: number | string | null; // El ID del usuario que realiza la acción (el actor)
  targetUserId?: number | string | null; // El ID del usuario afectado
  details?: string | null; // JSON stringificado con detalles adicionales
  ipAddress?: string | null;
}

export type AuditLogCreation = Omit<AuditLog, 'id' | 'timestamp'>;