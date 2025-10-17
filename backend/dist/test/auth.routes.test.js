// backend/tests/auth.routes.test.ts
import request from 'supertest';
import express from 'express';
import authRouter from '../routes/auth.js';
import { errorHandler } from '../middleware/errorHandler.js';
import { getDB } from '../db/database.js';
// Creamos una app de Express solo para las pruebas
const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);
app.use(errorHandler);
let db;
// Antes de que empiecen todas las pruebas, obtenemos la BD
beforeAll(async () => {
    db = await getDB();
});
// Después de cada prueba, limpiamos la tabla de usuarios
afterEach(() => {
    db.exec('DELETE FROM users');
    // Opcional: resetear el autoincremento para que los IDs sean predecibles
    db.exec("DELETE FROM sqlite_sequence WHERE name='users'");
});
// Después de todas las pruebas, cerramos la conexión a la BD
afterAll(() => {
    if (db) {
        db.close();
    }
});
describe('Auth Routes', () => {
    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body.email).toBe('test@example.com');
        });
        it('should fail to register with an existing email', async () => {
            // Primero, registramos un usuario
            await request(app).post('/api/auth/register').send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            });
            // Luego, intentamos registrarlo de nuevo
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                name: 'Another User',
                email: 'test@example.com',
                password: 'anotherpassword',
            });
            expect(res.statusCode).toEqual(400);
            expect(res.body.errors[0].msg).toBe('User with this email already exists');
        });
    });
});
//# sourceMappingURL=auth.routes.test.js.map