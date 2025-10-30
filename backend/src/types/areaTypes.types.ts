// backend/types/areaTypes.types.ts

/**
 * Define la estructura de la entidad AreaType, que representa una asociación en la tabla `area_types`.
 */
export interface AreaType {
  id: number; // Ahora es un número autoincremental
  area_id: string;
  area_type: string;
}