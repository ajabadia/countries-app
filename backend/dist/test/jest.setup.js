// backend/tests/jest.setup.ts
// Definimos las variables de entorno necesarias para las pruebas.
process.env.SECRET_JWT_SEED = 'test-secret-seed';
process.env.REFRESH_TOKEN_SECRET = 'test-refresh-secret';
process.env.DB_PATH = ':memory:'; // Usar base de datos en memoria para todas las pruebas
export {};
//# sourceMappingURL=jest.setup.js.map