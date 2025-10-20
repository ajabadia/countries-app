<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-hamburger-menu\README.md | Last Modified: 2025-10-19 -->

# Componente: `UiHamburgerMenuComponent`

El `UiHamburgerMenuComponent` proporciona un menú de navegación principal para toda la aplicación. Se presenta como un botón de "hamburguesa" que, al ser pulsado, despliega un panel lateral deslizable desde la izquierda.

## 1. Propósito y Funcionamiento

-   **Navegación Centralizada**: Actúa como el punto de acceso principal a las diferentes secciones de la aplicación.
-   **Panel Lateral Deslizable**: Muestra el menú en un panel (`<aside>`) que se desliza desde la izquierda, con un fondo (`overlay`) que oscurece el resto de la página para mejorar el foco.
-   **Agrupación por Categorías**: Utiliza el `ActionService` para obtener las acciones de navegación y las agrupa por categorías (ej. "Navegación Principal", "Administración").
-   **Acordeón**: Muestra estas categorías en un componente `ui-accordion`, permitiendo al usuario expandir y contraer cada sección.

## 2. Dependencias

-   `@core/services/action.service`: Utiliza este servicio como fuente de la verdad para obtener todas las acciones de navegación que se deben mostrar en el menú.
-   `@shared/components/ui-accordion`: Delega la renderización de las secciones del menú a este componente.
-   `@shared/components/ui-button`: Utilizado para los botones de apertura y cierre.
-   `@shared/components/ui-icon`: Para mostrar los iconos del menú.

## 3. Uso Básico

El componente está diseñado para ser colocado en una cabecera principal de la aplicación, como en `app.component.html`. No requiere ningún `@Input`.

```html
<!-- app.component.html -->

<header class="app-header">
  <!-- ... otros elementos de la cabecera ... -->
  <app-ui-hamburger-menu></app-ui-hamburger-menu>
</header>
```