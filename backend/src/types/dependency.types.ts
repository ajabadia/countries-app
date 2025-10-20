// backend/types/dependency.types.ts

/**
 * Define la estructura de la entidad Dependency, que representa una relación.
 */
export interface Dependency {
  id: number;
  parent_id: string;
  dependent_id: string;
}