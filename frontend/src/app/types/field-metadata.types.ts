// File: d:\desarrollos\countries2\frontend\src\app\types\field-metadata.types.ts | New File

import { ValidatorFn } from '@angular/forms';
import { FormFieldType } from '@app/shared/types/form.types';

/**
 * Define todos los metadatos para un único campo de una entidad.
 * Esta es la fuente única de la verdad para este campo.
 */
export interface FieldMetadata {
  // Propiedades para la UI
  label: string;
  type: FormFieldType;
  helpText?: string; // Para tooltips o placeholders

  // Propiedades para Validación
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp; // Para validación de caracteres (letras, números, etc.)
  customValidators?: ValidatorFn[];
  characterCasing?: 'uppercase' | 'lowercase'; // Para forzar mayúsculas/minúsculas

  // Propiedades Estructurales
  isPrimaryKey?: boolean;
  database?: 'countries.db' | 'auth.db';
  table?: string;
}

/**
 * Define la colección de metadatos para todos los campos de una entidad.
 */
export type EntityFieldDefinitions = {
  [fieldName: string]: FieldMetadata;
};

/**
 * El objeto de configuración principal que contiene las definiciones para todas las entidades.
 */
export type AppFieldConfig = {
  [entityName: string]: EntityFieldDefinitions;
};