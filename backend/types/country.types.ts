// backend/types/country.types.ts

/**
 * Define la estructura de la entidad Country, reflejando la tabla en la base de datos.
 */
export interface Country {
  id: string;
  defaultname: string;
  alpha2may: string;
  alpha3may: string;
  numeric: string;
  // Añade aquí otras propiedades del país si existen en la BD
}