# CountriesService

> Fecha de definición: 2025-10-10 17:19 CEST

El servicio **CountriesService** proporciona el acceso y la lógica centralizada para la consulta y manipulación de los datos de países, áreas, continentes, idiomas y dependencias a través de peticiones HTTP hacia una API backend (Node.js sobre SQLite en este proyecto).

---

## Interface principal: Country

```typescript
export interface Country {
  id: string;          // UUID o id único
  alpha2may: string;   // Código ISO Alpha-2
  alpha3may: string;   // Código ISO Alpha-3
  numeric: string;     // Código numérico
  defaultname: string; // Nombre principal (default)
}
```

---

## Métodos principales

- `getCountriesCount()` — Devuelve el total de países registrados
- `getAreasCount()` — Total de áreas
- `getContinentsCount()` — Total de continentes
- `getLanguagesCount()` — Total de idiomas distintos en la BD
- `getDependenciesCount()` — Total de países dependientes
- `getTranslationsCount()` — Total de nombres multilingües

- `getCountries(params)` — Lista paginable, filtrada y ordenada de países. Soporta:
    - Búsqueda (`search`), paginación (`page`, `pageSize`) y ordenación (`sortKey`, `sortOrder`)
    - Devuelve `{ data: Country[], total: number }`

#### Métodos CRUD para administración
- `updateCountry(country: Country)` — Actualiza un país existente
- `createCountry(country: Country)` — Crea un país nuevo
- `deleteCountry(id: string)` — Elimina un país por id

---

## Ejemplo de uso

```typescript
constructor(private countriesService: CountriesService) {}

ngOnInit() {
  this.countriesService.getCountries({ search: 'Spain', page: 1, pageSize: 20 }).subscribe(result => {
      this.countries = result.data;
      this.total = result.total;
  });
}
```

---

## Notas de implementación

- Usa `@Injectable({ providedIn: 'root' })` — singleton global
- Todos los métodos devuelven `Observable` y funcionan de forma reactiva con Angular
- Si no usas proxy (`proxy.conf.json`), pon el dominio en las URL del backend
- El modelo puede ampliarse para asociar áreas/continentes/idiomas por ID

---

## Consejo práctico

Utilízalo como fuente única para el acceso de datos relacionados con countries (y entidades transversales) en todos los componentes y páginas del proyecto.

