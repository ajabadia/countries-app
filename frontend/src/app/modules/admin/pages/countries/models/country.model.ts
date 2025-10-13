// src/app/core/models/country.model.ts

/**
 * @interface Country
 * Define la estructura de datos para un país.
 * Esta interfaz se utiliza en todo el frontend para asegurar que los objetos 'country'
 * tengan siempre la misma forma, lo que previene errores de tipado.
 */
export interface Country {
  // Usamos 'string | number' para el ID porque puede venir como número de la DB pero lo manejamos como string.
  id: string | number;
  alpha2may: string;
  alpha3may:string;
  numeric: number;
  defaultname: string;
  // El operador [key: string]: any; permite que el objeto tenga otras propiedades no definidas explícitamente.
  // Es útil para que el objeto 'country' pueda usarse en la tabla dinámica sin que TypeScript se queje.
  [key: string]: any;
}