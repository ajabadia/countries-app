// File: d:\desarrollos\countries2\frontend\src\app\core\config\field-definitions.config.ts | New File

import { AppFieldConfig } from '@app/types/field-metadata.types';

/**
 * REGISTRO CENTRAL DE METADATOS DE CAMPOS
 * Esta es la fuente única de la verdad para todos los campos de la aplicación.
 */
export const FIELD_DEFINITIONS: AppFieldConfig = {
  // --- Entidad: countries ---
  countries: {
    id: {
      label: 'Código ISO 2 (id)',
      type: 'text',
      required: true,
      minLength: 2,
      maxLength: 2,
      pattern: /^[a-z]{2}$/,
      isPrimaryKey: true,
      characterCasing: 'lowercase', // ✅ AÑADIDO: Forzar minúsculas
      helpText: 'Código de 2 letras minúsculas del país.',
      database: 'countries.db',
      table: 'countries',
    },
    defaultname: {
      label: 'Nombre del País',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100,
      helpText: 'Nombre común del país en inglés.',
      database: 'countries.db',
      table: 'countries',
    },
    alpha2may: {
      label: 'Código ISO 2 (Mayúsculas)',
      type: 'text',
      required: true,
      minLength: 2,
      maxLength: 2,
      pattern: /^[A-Z]{2}$/, // ✅ CORREGIDO: El patrón ahora espera mayúsculas
      helpText: 'Código de 2 letras mayúsculas del país.',
      characterCasing: 'uppercase', // ✅ AÑADIDO: Forzar mayúsculas
      database: 'countries.db',
      table: 'countries',
    },
    alpha3may: {
      label: 'Código ISO 3',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 3,
      pattern: /^[A-Z]{3}$/, // ✅ CORREGIDO: El patrón ahora espera mayúsculas
      helpText: 'Código de 3 letras mayúsculas del país.',
      characterCasing: 'uppercase', // ✅ AÑADIDO: Forzar mayúsculas
      database: 'countries.db',
      table: 'countries',
    },
    numeric: {
      label: 'Código UN M49',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 3,
      pattern: /^[0-9]{3}$/,
      helpText: 'Código numérico de 3 dígitos asignado por la ONU.',
      database: 'countries.db',
      table: 'countries',
    },
  },

  // --- Entidad: users ---
  users: {
    name: {
      label: 'Usuario',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 50,
      database: 'auth.db',
      table: 'users',
    },
    email: {
      label: 'Email',
      type: 'email', // Usamos el tipo 'email' para que el validador se aplique automáticamente
      minLength: 5,
      maxLength: 100,
      required: true,
      database: 'auth.db',
      table: 'users',
    },
    password: {
      label: 'Contraseña',
      type: 'password',
      minLength: 8,
      helpText: 'Mínimo 8 caracteres. Dejar en blanco para no cambiar.',
      database: 'auth.db',
      table: 'users',
    },
    role: {
      label: 'Rol',
      type: 'text', // Esto será un 'select' en el futuro
      required: true,
      database: 'auth.db',
      table: 'users',
    },
  },

  // --- Entidad: continents ---
  continents: {
    id: {
      label: 'Código del Continente',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 3,
      pattern: /^[0-9]{3}$/,
      isPrimaryKey: true,
      helpText: 'Código de 3 números del continente.',
      database: 'countries.db',
      table: 'continents',
    },
    defaultname: {
      label: 'Nombre del Continente',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100,
      database: 'countries.db',
      table: 'continents',
    },
  },

  // --- Entidad: languages ---
  languages: {
    id: {
      label: 'Código ISO 639-1',
      type: 'text',
      required: true,
      minLength: 2,
      maxLength: 2,
      pattern: /^[a-z]{2}$/,
      isPrimaryKey: true,
      helpText: 'Código de 2 letras minúsculas del idioma (ej. es).',
      database: 'countries.db',
      table: 'languages',
      characterCasing: 'lowercase', 
    },
    name: {
      label: 'Nombre del Idioma',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100,
      database: 'countries.db',
      table: 'languages',
    },
    active: {
      label: 'Activo',
      type: 'boolean',
      required: true,
      helpText: 'Indica si el idioma está activo en el sistema.',
      database: 'countries.db',
      table: 'languages',
    },
  },

  // --- Entidad: areas ---
  areas: {
    id: {
      label: 'Código del Área',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 3,
      pattern: /^[0-9]{3}$/,
      isPrimaryKey: true,
      helpText: 'Código numérico de 3 dígitos del área.',
      database: 'countries.db',
      table: 'areas',
    },
    defaultname: {
      label: 'Nombre del Área',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100,
      database: 'countries.db',
      table: 'areas',
    },
  },

  // --- Entidad: area_types ---
  area_types: {
    area_id: { label: 'ID del Área', type: 'text', required: true },
    area_type: { label: 'Tipo de Área', type: 'text', required: true },
  },

  // --- Entidad: dependencies ---
  dependencies: {
    parent_id: { label: 'ID de la Entidad Superior', type: 'text', required: true },
    dependent_id: { label: 'ID del Dependiente', type: 'text', required: true },
  },

  // --- Entidad: multilingualnames ---
  multilingualnames: {
    entity_id: { label: 'ID de la Entidad', type: 'text', required: true },
    language: {
      label: 'ID del Lenguaje',
      type: 'text',
      required: true,
      minLength: 2,
      maxLength: 2,
      pattern: /^[a-z]{2}$/,
      characterCasing: 'lowercase', 
      helpText: 'Código de 2 letras minúsculas del idioma (ej. es).',
    },
    value: { label: 'Traducción', type: 'text', required: true },
    type: {
      label: 'Tipo de Entidad',
      type: 'text',
      required: true,
      helpText: "Ej: 'country', 'continent', 'lang'",
    },
  },
};