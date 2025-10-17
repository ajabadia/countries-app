// backend/tests/jest.setup.ts

import dotenv from 'dotenv';
import path from 'path';

// Carga las variables de entorno desde .env.test
// Esto asegura que las pruebas usen su propia configuración (ej. una BD de pruebas)
dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });