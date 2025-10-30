/**
 * Representa una entidad de País.
 */
export interface Country {
  id: string; // Código ISO 3166-1 alfa-2 (ej. 'ES')
  defaultname: string; // Nombre del país en inglés
  alpha2may: string; // Código ISO 2 en mayúsculas (ej. 'ES')
  alpha3may: string; // Código ISO 3166-1 alfa-3 (ej. 'ESP')
  numeric: string; // Código numérico UN M.49 (ej. '724')
  // Otros campos específicos de Country si los hubiera
}