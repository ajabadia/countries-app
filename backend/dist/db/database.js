// backend/db/database.ts
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../config/logger.js';
import bcrypt from 'bcryptjs';
// En módulos ES6, __dirname no está disponible. Lo calculamos a partir de import.meta.url.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Permitimos que la ruta de la BD se sobrescriba para las pruebas en memoria.
const dbPath = process.env.DB_PATH || path.resolve(__dirname, 'countries.db');
let db;
/**
 * Ejecuta el script de inicialización de la base de datos.
 * Crea las tablas necesarias y un usuario administrador por defecto si no existen.
 * @param dbInstance La instancia de la base de datos.
 */
async function initializeDatabase(dbInstance) {
    // Sentencia SQL para crear la tabla de usuarios
    const createUsersTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('user', 'admin')),
      failedLoginAttempts INTEGER NOT NULL DEFAULT 0,
      lockUntil INTEGER,
      resetPasswordToken TEXT,
      resetPasswordExpire INTEGER,
      refreshToken TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;
    dbInstance.exec(createUsersTableSQL);
    logger.info('Tabla "users" inicializada correctamente.');
    // Sentencia SQL para crear la tabla de logs de auditoría
    const createAuditLogsTableSQL = `
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      level TEXT NOT NULL CHECK(level IN ('INFO', 'WARN', 'CRITICAL')),
      eventType TEXT NOT NULL,
      userId INTEGER,
      targetUserId INTEGER,
      details TEXT,
      ipAddress TEXT
    );
  `;
    dbInstance.exec(createAuditLogsTableSQL);
    logger.info('Tabla "audit_logs" inicializada correctamente.');
    // Crear usuario administrador por defecto
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
    const adminName = process.env.DEFAULT_ADMIN_NAME;
    if (!adminEmail || !adminPassword || !adminName) {
        logger.warn('No se han definido las variables de entorno para el admin por defecto. Saltando creación.');
        return;
    }
    const stmt = dbInstance.prepare('SELECT id FROM users WHERE email = ?');
    const existingAdmin = stmt.get(adminEmail);
    if (!existingAdmin) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);
        const insertStmt = dbInstance.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
        insertStmt.run(adminName, adminEmail, hashedPassword, 'admin');
        logger.info('Usuario administrador por defecto creado con éxito.');
    }
}
export async function getDB() {
    if (!db) {
        // Usamos nuestro logger para las consultas SQL en modo debug
        db = new Database(dbPath, {
            readonly: false,
            verbose: (message) => logger.debug(message),
        });
        await initializeDatabase(db); // Llamamos a la función de inicialización aquí
    }
    return db;
}
//# sourceMappingURL=database.js.map