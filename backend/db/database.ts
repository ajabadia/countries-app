// backend/db/database.ts
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// En módulos ES6, __dirname no está disponible. Lo calculamos a partir de import.meta.url.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db: Database.Database;

export function getDB(): Database.Database {
  if (!db) {
    // verbose: console.log se puede usar para depurar las consultas SQL
    db = new Database(path.join(__dirname, 'countries.db'), { readonly: false, verbose: console.log });
  }
  return db;
}