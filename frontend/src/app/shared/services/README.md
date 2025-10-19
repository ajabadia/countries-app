<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\services\README.md | Last Modified: 2025-10-19 -->

# Servicios Compartidos

Este directorio contiene servicios genéricos y reutilizables que proporcionan funcionalidades transversales a toda la aplicación.

---

## 1. BaseCrudService

`BaseCrudService<T>` es una **clase base abstracta** que define un contrato estandarizado para los servicios que realizan operaciones CRUD (Crear, Leer, Actualizar, Borrar) contra la API.

No está pensado para ser inyectado directamente, sino para ser **heredado** por servicios de entidad específicos (ej. `CountriesService`).

### Propósito

Su objetivo es centralizar y reutilizar la lógica común de las llamadas HTTP para operaciones CRUD, siguiendo el principio DRY (Don't Repeat Yourself).

### API

Un servicio que herede de `BaseCrudService` deberá implementar la propiedad `apiUrl` y tendrá acceso a los siguientes métodos:

| Método     | Parámetros                               | Retorna                        | Descripción                                       |
| ---------- | ---------------------------------------- | ------------------------------ | ------------------------------------------------- |
| `getAll`   | `params: HttpParams`                     | `Observable<PagedResponse<T>>` | Obtiene una lista paginada de elementos.          |
| `getById`  | `id: number \| string`                  | `Observable<T>`                | Obtiene un único elemento por su ID.              |
| `create`   | `item: Partial<T>`                       | `Observable<T>`                | Crea un nuevo elemento.                           |
| `update`   | `id: number \| string`, `item: Partial<T>` | `Observable<T>`                | Actualiza un elemento existente por su ID.        |
| `delete`   | `id: number \| string`                  | `Observable<void>`             | Elimina un elemento por su ID.                    |

### Ejemplo de Uso

```typescript
// 1. Definir el servicio específico de la entidad
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '@shared/services/base-crud.service';
import { Country } from '@core/types/country.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService extends BaseCrudService<Country> {
  // 2. Implementar la URL de la API
  protected override readonly apiUrl = '/api/countries';

  constructor() {
    // 3. Pasar el HttpClient al constructor de la clase base
    super(inject(HttpClient));
  }
}
```

---

## 2. IconService

Este servicio se encarga de cargar y cachear de forma eficiente los iconos SVG que se usan en la aplicación a través del componente `app-ui-icon`.

### Propósito

Evitar múltiples peticiones HTTP para el mismo icono. Cuando se solicita un icono por primera vez, se realiza una petición HTTP, se sanitiza el SVG y el `Observable` resultante se guarda en una caché. Las solicitudes posteriores para el mismo icono devuelven el `Observable` cacheado, mejorando drásticamente el rendimiento.

### API Pública

| Método        | Parámetros                                                  | Retorna                  | Descripción                                                                                              |
| ------------- | ----------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------- |
| `getIcon`     | `name: string`, `type?: UiIconType`                         | `Observable<SafeHtml>`   | Obtiene el contenido SVG de un icono como un `SafeHtml` listo para ser renderizado con `[innerHTML]`. |
| `getIconPath` | `name: string`, `type: UiIconType`, `extension: string` | `string`                 | Construye la ruta a un icono de tipo imagen (ej. `.png`).                                                |

---

## 3. SelectionService

`SelectionService<T>` es un servicio genérico que proporciona una solución completa para gestionar la selección de elementos en una lista o tabla, como `app-ui-table`.

### Propósito

Centralizar el estado y la lógica de la selección de items, permitiendo que múltiples componentes (ej. una tabla y una barra de herramientas) puedan reaccionar a los cambios en la selección de forma sincronizada.

Utiliza un `BehaviorSubject` de RxJS para notificar a los suscriptores cada vez que la selección cambia.

### API Pública

| Miembro              | Tipo                                | Descripción                                                              |
| -------------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| `selectionChanges`   | `Observable<Set<number \| string>>` | Un `Observable` que emite el `Set` de IDs seleccionados cada vez que cambia. |
| `size`               | `number`                            | Devuelve el número de elementos actualmente seleccionados.               |
| `isSelected`         | `(item: T) => boolean`              | Comprueba si un item específico está seleccionado.                       |
| `toggle`             | `(item: T) => void`                 | Añade o quita un item de la selección.                                   |
| `areAllSelected`     | `(items: T[]) => boolean`           | Comprueba si todos los items de una lista están seleccionados.           |
| `toggleAll`          | `(items: T[]) => void`              | Selecciona o deselecciona todos los items de una lista.                  |
| `clear`              | `() => void`                        | Limpia la selección, eliminando todos los IDs.                           |
| `getSelectedIds`     | `() => (number \| string)[]`        | Devuelve un array con los IDs de todos los elementos seleccionados.      |
