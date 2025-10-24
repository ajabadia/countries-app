/**
 * Define la estructura de la entidad Multilingualname para el frontend.
 */
export interface Multilingualname {
  id: number;
  entity_id: string;
  language: string;
  value: string;
  type: string;
}