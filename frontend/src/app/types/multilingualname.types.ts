/**
 * Representa una entidad de Nombre Multilingüe (Traducción).
 */
export interface Multilingualname {
  id: number; // ID autoincremental de la traducción
  entity_id: string; // ID de la entidad a la que pertenece la traducción (ej. 'ES', 'EU')
  language: string; // Código del idioma de la traducción (FK a Language.id)
  value: string; // El nombre traducido (ej. 'España')
  type: string; // Tipo de la entidad a la que pertenece el ID (ej. 'country', 'continent')
  // Otros campos específicos de Multilingualname si los hubiera
}