<!-- File: d:\desarrollos\countries2\frontend\src\app\core\services\README.md | Last Modified: 2025-10-19 -->

# Servicios Core

Este directorio contiene los servicios singleton fundamentales para el funcionamiento de la aplicación.

---

## ActionService

Este servicio es el "cerebro" que centraliza la definición de todas las acciones y enlaces de navegación de la aplicación. Su propósito es desacoplar la *definición* de una acción (qué es y qué hace) de su *presentación* en la interfaz de usuario (cómo se ve).

### El Problema que Resuelve

En lugar de que cada componente (una barra de navegación, un menú de acciones, un pie de página) defina sus propios botones y lógica, `ActionService` actúa como la **única fuente de la verdad**. Los componentes de UI simplemente solicitan las acciones que necesitan para un contexto determinado y las renderizan.

### Interfaz Principal: `AppAction`

El servicio se basa en una interfaz genérica que puede representar cualquier tipo de acción:

```typescript
export type ActionType = 'route' | 'href' | 'function';
export type ActionCategory = 'public' | 'user' | 'admin' | 'dev';

export interface AppAction {
  id: string;          // Identificador único
  label: string;         // Texto para mostrar
  icon?: string;         // Icono opcional
  type: ActionType;      // Tipo de acción
  category: ActionCategory; // Categoría para filtrado

  // Propiedades condicionales
  route?: string | any[];       // Para type: 'route'
  href?: string;               // Para type: 'href'
  onClick?: () => void;        // Para type: 'function'
  disabled$?: Observable<boolean>; // Estado de deshabilitado dinámico

  // Pistas visuales para la UI
  ui?: {
    color?: ButtonColor;
    variant?: ButtonVariant;
  };
}
```

### API Pública

| Método                    | Parámetros                                                              | Retorna                   | Descripción                                                                                                                               |
| ------------------------- | ----------------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `getActionsForCategories` | `categories: ActionCategory[]`                                          | `AppAction[]`             | Obtiene una lista de acciones filtradas por una o más categorías.                                                                         |
| `toToolbarButtonConfig`   | `actions: AppAction[]`, `handlers?: { actions?, disabled$? }` | `ToolbarButtonConfig[]` | **Adaptador** que convierte `AppAction` genéricas al formato específico que espera el componente `app-ui-toolbar-buttons`. |

### Flujo de Trabajo Típico

1.  **Definición**: Todas las posibles acciones de la aplicación se definen en el array `_allActions` dentro de `action.service.ts`.
2.  **Solicitud**: Un componente o directiva (ej. `BaseAdminDirective`) inyecta `ActionService`.
3.  **Filtrado**: Llama a `getActionsForCategories()` para obtener solo las acciones que necesita (ej. las de categoría `'admin'` que sean para un toolbar).
4.  **Adaptación**: Llama a `toToolbarButtonConfig()`, pasando las acciones filtradas y un mapa de `handlers` que conecta los `id` de las acciones con los métodos reales del componente/directiva (ej. `{ 'toolbar-save': () => this.onSave() }`).
5.  **Renderizado**: El array `ToolbarButtonConfig[]` resultante se pasa a un componente de UI "tonto" (como `app-ui-toolbar-buttons`), que solo se encarga de renderizarlo.
