/**
 * Representa una entidad de Tipo de Área.
 * Es una tabla de unión entre un área y su tipo.
 */
export interface AreaType {
  id: number; // ID autoincremental de la relación
  area_id: string; // ID del área (FK a Area.id)
  area_type: string; // Tipo de área (ej. 'Economic Block', 'Region')
}