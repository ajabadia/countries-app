// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-accordion\ui-accordion.types.ts | Last Modified: 2025-10-19

import { TemplateRef } from '@angular/core';

/**
 * Define la estructura de un único item para el componente de acordeón.
 */
export interface AccordionItem {
  id: string;
  title: string;
  content: TemplateRef<any>; // La plantilla para el contenido del panel
  disabled?: boolean; // Si el panel está deshabilitado
  expanded?: boolean; // Si el panel está expandido por defecto
}