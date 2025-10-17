// d:/desarrollos/countries2/backend/types/express/index.d.ts

import type { User } from '../user.types.js';

// Le decimos a TypeScript que vamos a modificar un módulo global.
declare global {
  namespace Express {
    // Fusionamos nuestra nueva propiedad 'user' en la interfaz Request existente.
    export interface Request {
      user?: User;
    }
  }
}