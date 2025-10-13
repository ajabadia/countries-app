// src/app/modules/shared/models/country.model.ts

/**
 * Interfaz principal para la entidad País.
 * Los campos 'alpha2may', 'alpha3may' y 'numeric' coinciden con el backend de Node.js.
 */
export interface Country {
  // El ID puede ser number o string (EN MI BASE ES STRING), lo dejamos flexible si no es un UUID, 
  // pero el error anterior sugería que el servicio esperaba string.
  id: string | number; 
  // El nombre real que se muestra en la tabla (puede ser la traducción)
  defaultname: string; 
  
  // Campos alfabéticos y numéricos estándar (ISO)
  alpha2may: string;
  alpha3may: string;
  numeric: string;
  
  // Para acceso dinámico (robustez en la tabla Angular, por ejemplo, en getColValue)
  [key: string]: any; 
}