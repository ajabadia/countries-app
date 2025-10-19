<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-hamburger-menu\README.md | Last Modified: 2025-10-19 -->

# UI Hamburger Menu Component (`<app-ui-hamburger-menu>`)

Este es un componente "inteligente" que renderiza un menú de navegación completo, accesible a través de un botón de hamburguesa. Utiliza `ActionService` como fuente de la verdad para los enlaces y `app-ui-accordion` para presentarlos de forma agrupada.

## Características

-   **Botón de Hamburguesa**: Un `ui-button` de solo icono que abre y cierra el panel del menú.
-   **Integración con `ActionService`**: Obtiene las acciones de navegación directamente del `ActionService`, asegurando que el menú siempre esté sincronizado con la estructura de la aplicación.
-   **Agrupación por Categorías**: Agrupa automáticamente los enlaces por su `category` (ej. "Navegación Principal", "Administración") y los muestra en un acordeón.
-   **Preparado para Permisos**: Al depender de `ActionService`, si en el futuro el servicio filtra las acciones según el rol del usuario, el menú se adaptará automáticamente sin necesidad de cambios.

## Cómo Usarlo

El componente es autónomo. Simplemente colócalo en la plantilla donde quieras que aparezca el menú (normalmente en una cabecera o barra de navegación principal).

```html
<app-ui-hamburger-menu></app-ui-hamburger-menu>
```

El componente se encargará internamente de:
1.  Llamar a `ActionService`.
2.  Obtener las acciones de las categorías `public` y `admin`.
3.  Agruparlas.
4.  Generar los `AccordionItem[]` necesarios.
5.  Pasar los datos al componente `app-ui-accordion` que renderiza en su plantilla.
