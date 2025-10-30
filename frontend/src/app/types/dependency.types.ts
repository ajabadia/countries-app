/**
 * Representa una entidad de Dependencia.
 * Se utiliza para definir relaciones genéricas entre entidades,
 * como la relación País-Continente.
 */
export interface Dependency {
  id: number; // ID autoincremental de la relación
  parent_id: string; // ID de la entidad principal (ej. un continente como 'EU')
  dependent_id: string; // ID de la entidad dependiente (ej. un país como 'ES')
}