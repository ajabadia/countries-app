// backend/types/language.types.ts

/**
 * Define la estructura de la entidad Language.
 */
export interface Language {
  id: string;
  name: string;
  active: number; // 0 o 1
}