<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-accordion\README.md | Last Modified: 2025-10-19 -->

# UI Accordion Component (`<app-ui-accordion>`)

Componente genérico y reutilizable para mostrar contenido en un formato de acordeón.

## Características

-   **Configurable**: Se construye a partir de un array de `AccordionItem`.
-   **Proyección de Contenido**: Utiliza `ng-template` para permitir que el contenido de cada panel del acordeón sea completamente personalizable por el componente padre.
-   **Expansión Múltiple**: Se puede configurar para permitir que varios paneles estén abiertos a la vez (`[ui-accordion-multi-expandable]="true"`) o para que solo uno pueda estar abierto (comportamiento por defecto).
-   **Accesibilidad**: Implementa los atributos `aria-expanded`, `aria-controls` y `role="region"` para una correcta interacción con lectores de pantalla.
-   **API Prefijada**: Sigue las directrices del proyecto para los nombres de los inputs.

## Cómo Usarlo

El componente padre debe definir un array de `AccordionItem` y las plantillas (`<ng-template>`) que se usarán para renderizar el contenido.

**En tu componente `.ts`:**
```typescript
import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { AccordionItem } from './ui-accordion.types';

@Component({ ... })
export class MyComponent implements OnInit {
  @ViewChild('templateA', { static: true }) templateA!: TemplateRef<any>;
  @ViewChild('templateB', { static: true }) templateB!: TemplateRef<any>;

  accordionItems: AccordionItem[] = [];

  ngOnInit(): void {
    this.accordionItems = [
      {
        id: 'item-1',
        title: 'Panel 1',
        content: this.templateA,
        expanded: true, // Este panel estará abierto por defecto
      },
      {
        id: 'item-2',
        title: 'Panel 2',
        content: this.templateB,
      },
    ];
  }
}
```

**En tu plantilla `.html`:**
```html
<!-- 1. El componente de acordeón, bindeado a los items -->
<app-ui-accordion [ui-accordion-items]="accordionItems"></app-ui-accordion>

<!-- 2. Las plantillas que se proyectarán dentro del acordeón -->
<ng-template #templateA>
  <p>Contenido del primer panel.</p>
</ng-template>

<ng-template #templateB>
  <ul>
    <li>Contenido</li>
    <li>del</li>
    <li>segundo panel.</li>
  </ul>
</ng-template>
```

## API

### Inputs

| Input                         | Tipo              | Por Defecto | Descripción                                                              |
| ----------------------------- | ----------------- | ----------- | ------------------------------------------------------------------------ |
| `ui-accordion-items`          | `AccordionItem[]` | `[]`        | El array de configuración para los paneles del acordeón.                 |
| `ui-accordion-multi-expandable` | `boolean`         | `false`     | Si es `true`, permite que varios paneles estén abiertos simultáneamente. |

### Interface `AccordionItem`

Se define en `ui-accordion.types.ts`.

| Propiedad  | Tipo                | Requerido | Descripción                                                              |
| ---------- | ------------------- | --------- | ------------------------------------------------------------------------ |
| `id`       | `string`            | Sí        | Un identificador único para el panel.                                    |
| `title`    | `string`            | Sí        | El texto que se mostrará en la cabecera del panel.                       |
| `content`  | `TemplateRef<any>`  | Sí        | La referencia a la plantilla (`<ng-template>`) que contiene el cuerpo del panel. |
| `disabled` | `boolean`           | No        | Si es `true`, el panel no se puede abrir o cerrar.                       |
| `expanded` | `boolean`           | No        | Si es `true`, el panel se mostrará expandido por defecto.                |
