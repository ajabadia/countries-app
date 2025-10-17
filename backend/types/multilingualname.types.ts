// backend/types/multilingualname.types.ts

/**
 * Define la estructura de la entidad MultilingualName, usada para traducciones.
 */
export interface MultilingualName {
  id: number;
  entity_id: string;
  language: string;
  value: string;
  type: string;
}