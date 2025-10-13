// src/app/modules/shared/models/country.model.ts

export interface Country {
  id: number;
  name: string;
  code: string;
  population?: number;
  continent?: string;
  // agrega aquí todos los campos reales de tu modelo

  // Index signature para acceso dinámico (evita errores con [key])
  [key: string]: any;
}
