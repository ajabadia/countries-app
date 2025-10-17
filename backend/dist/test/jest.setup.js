// backend/tests/jest.setup.ts
import { config } from 'dotenv';
import path from 'path';
// Carga las variables de entorno desde .env.test
// Esto asegura que las pruebas usen su propia configuración (ej. una BD de pruebas)
config({ path: path.resolve(process.cwd(), 'test/.env.test') });
//# sourceMappingURL=jest.setup.js.map