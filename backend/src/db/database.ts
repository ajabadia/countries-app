// backend/db/database.ts
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'; // ✅ NUEVO: Importamos el módulo 'fs' para leer archivos
import logger from '../config/logger.js';

// En módulos ES6, __dirname no está disponible. Lo calculamos a partir de import.meta.url.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORRECCIÓN: Se calcula la ruta a la carpeta 'src' de forma robusta.
// Esto asegura que siempre encontremos los archivos de la base de datos
// sin importar si el código se ejecuta desde 'src' o 'dist'.
const srcDir = __dirname.includes('dist') ? path.resolve(__dirname, '..', '..', 'src') : __dirname;
const dbPath = process.env.DB_PATH || path.resolve(srcDir, 'db', 'countries.db');

let db: Database.Database;

/**
 * Ejecuta el script de inicialización de la base de datos.
 * Crea las tablas necesarias y un usuario administrador por defecto si no existen.
 * @param dbInstance La instancia de la base de datos.
 */
async function initializeDatabase(dbInstance: Database.Database) {
  // ✅ CAMBIO RADICAL: Usamos la exportación JSON para crear y poblar la base de datos.
  // Esto es mucho más robusto y completo que crear las tablas manualmente.
  const exportFilePath = path.resolve(srcDir, 'db', 'db_export', 'countries-db-export.json');

  try {
    const exportFileContent = fs.readFileSync(exportFilePath, 'utf-8');
    const dbExport = JSON.parse(exportFileContent);

    // Usamos una transacción para asegurar que todas las operaciones se completen
    // o ninguna lo haga, y para mejorar el rendimiento masivamente.
    const populateDb = dbInstance.transaction(() => {
      for (const table of dbExport.objects) {
        if (table.type === 'table') {
          // 1. Crear la tabla (usando el DDL del JSON)
          // Añadimos "IF NOT EXISTS" para que sea seguro ejecutarlo múltiples veces.
          const createTableSQL = table.ddl.replace('CREATE TABLE', 'CREATE TABLE IF NOT EXISTS');
          dbInstance.exec(createTableSQL);

          // 2. Comprobar si la tabla ya tiene datos antes de insertarlos
          const countStmt = dbInstance.prepare(`SELECT COUNT(*) as count FROM ${table.name}`);
          const { count } = countStmt.get() as { count: number };

          if (count === 0 && table.rows && table.rows.length > 0) {
            // 3. Preparar la sentencia de inserción
            const columns = table.columns.map((c: { name: string }) => c.name).join(', ');
            const placeholders = table.columns.map(() => '?').join(', ');
            const insertSQL = `INSERT INTO ${table.name} (${columns}) VALUES (${placeholders})`;
            const insertStmt = dbInstance.prepare(insertSQL);

            // 4. Insertar todas las filas para esa tabla
            for (const row of table.rows) {
              insertStmt.run(...row);
            }
            logger.info(`Tabla "${table.name}" poblada con ${table.rows.length} registros.`);
          } else if (count > 0) {
            logger.info(`Tabla "${table.name}" ya contiene datos. Saltando población.`);
          } else {
            logger.info(`Tabla "${table.name}" creada (sin datos para insertar).`);
          }
        }
      }
    });

    populateDb();
    logger.info('Base de datos inicializada correctamente desde el archivo JSON.');

  } catch (error) {
    logger.error('Error al inicializar la base de datos desde el archivo JSON:', error);
    // Si falla la lectura del JSON, detenemos la aplicación para evitar un estado inconsistente.
    process.exit(1);
  }

}

export async function getDB(): Promise<Database.Database> {
  if (!db) {
    // ✅ CORRECCIÓN: Comprobamos si el archivo de la base de datos ya existe.
    const dbExists = fs.existsSync(dbPath);

    // Usamos nuestro logger para las consultas SQL en modo debug
    db = new Database(dbPath, {
      readonly: false,
      verbose: (message: unknown) => {
        logger.debug(String(message));
      },
    });

    // Solo inicializamos la base de datos si el archivo no existía previamente.
    if (!dbExists) {
      logger.info(`El archivo de base de datos no existe en "${dbPath}". Creando y poblando desde JSON...`);
      await initializeDatabase(db); // ✅ CORRECCIÓN: Se añade 'await'
    } else {
      logger.info(`Conectado a la base de datos existente en "${dbPath}".`);
    }
  }
  return db;
}