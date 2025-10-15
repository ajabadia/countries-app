// src/app/models/country.model.ts

/**
 * @interface Country
 * Define la estructura de datos para un país.
 * Esta es la interfaz principal y única fuente de verdad para la entidad 'Country'.
 */
export interface Country {
  id: string | number;
  defaultname: string;

  // Campos alfabéticos y numéricos estándar (ISO)
  alpha2may: string;
  alpha3may: string;
  numeric: number;

  // Para acceso dinámico (robustez en la tabla Angular, por ejemplo, en getColValue)
  [key: string]: any;
}