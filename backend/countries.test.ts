import supertest from 'supertest';
import { type Express } from 'express';
import { createApp } from '../index.js';
import { getDB } from '../db/database.js';
import type Database from 'better-sqlite3';

describe('Countries API', () => {
  let app: Express;
  let db: Database.Database;

  // Antes de que se ejecuten todos los tests, inicializamos la app y la BD
  beforeAll(async () => {
    // Usamos una base de datos en memoria para los tests
    process.env.DB_PATH = ':memory:';
    app = await createApp();
    db = await getDB();
  });

  // Después de todos los tests, cerramos la conexión a la BD
  afterAll(() => {
    if (db) {
      db.close();
    }
  });

  describe('GET /api/countries', () => {
    it('should return a list of countries with pagination data', async () => {
      // Arrange: La base de datos ya ha sido poblada por `createApp`

      // Act: Hacemos la petición a la API
      const response = await supertest(app).get('/api/countries');

      // Assert: Verificamos la respuesta
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0); // Asumiendo que la BD se pobló
    });
  });
});