// File: d:\desarrollos\countries2\backend\src\db\authDatabase.ts | New File

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import logger from '../config/logger.js';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = __dirname.includes('dist') ? path.resolve(__dirname, '..', '..', 'src') : __dirname;
const dbPath = process.env.AUTH_DB_PATH || path.resolve(srcDir, 'db', 'auth.db');

async function initializeAuthDatabase(dbInstance: Database.Database) {
  const exportFilePath = path.resolve(srcDir, 'db', 'db_export', 'auth-db-export.json');

  try {
    const exportFileContent = fs.readFileSync(exportFilePath, 'utf-8');
    const dbExport = JSON.parse(exportFileContent);

    const usersTable = dbExport.objects.find((obj: any) => obj.name === 'users');
    if (usersTable && usersTable.type === 'table') {
      const createTableSQL = usersTable.ddl.replace('CREATE TABLE', 'CREATE TABLE IF NOT EXISTS');
      dbInstance.exec(createTableSQL);
      logger.info('Tabla "users" en auth.db inicializada correctamente desde JSON.');
    } else {
      throw new Error('No se encontró la definición de la tabla "users" en auth-db-export.json');
    }
  } catch (error) {
    logger.error('Error al inicializar la base de datos de autenticación desde JSON:', error);
    process.exit(1);
  }

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
    logger.info('Usuario administrador por defecto creado en auth.db.');
  }
}

let authDb: Database.Database;

export async function getAuthDB(): Promise<Database.Database> {
  if (!authDb) {
    const dbExists = fs.existsSync(dbPath);
    authDb = new Database(dbPath, {
      verbose: (message: unknown) => {
        logger.debug(String(message));
      },
    });
    authDb.pragma('journal_mode = WAL');

    if (!dbExists) {
      logger.info(`El archivo de auth.db no existe en "${dbPath}". Creando...`);
      await initializeAuthDatabase(authDb);
    } else {
      logger.info(`Conectado a la base de datos de autenticación existente en "${dbPath}".`);
    }
  }
  return authDb;
}