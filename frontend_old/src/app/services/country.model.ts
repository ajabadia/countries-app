// src/app/modules/shared/models/country.model.ts

/**
 * @interface Country
 * Define la estructura de datos para un país.
 * Esta es la interfaz principal y única fuente de verdad para la entidad 'Country'.
 */
export interface Country {
  // El ID puede ser number o string (EN MI BASE ES STRING), lo dejamos flexible si no es un UUID, 
  id: string | number; 
  // El nombre real que se muestra en la tabla (puede ser la traducción)
  defaultname: string; 
  
  // Campos alfabéticos y numéricos estándar (ISO)
  alpha2may: string;
  alpha3may: string;
  numeric: number;
  
  // Para acceso dinámico (robustez en la tabla Angular, por ejemplo, en getColValue)
  [key: string]: any; 
}