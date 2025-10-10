# search-box

> Componente para entrada de búsqueda reutilizable.  
> Última edición: **2025-10-10 17:58 CEST**

## Descripción

`search-box` es un componente Angular que ofrece UI moderna y accesible para búsquedas en listas, tablas, formularios, etc. Incluye icono, botón de limpiar y soporte para cambios debounced.

---

## Uso Básico

<app-search-box
[value]="searchTerm"
(valueChange)="onValueChange($event)"
placeholder="Buscar país...">
</app-search-box>

text

---

## Inputs

| Propiedad    | Tipo    | Descripción                              |
|--------------|---------|------------------------------------------|
| value        | string  | Valor actual del input                   |
| placeholder  | string  | Texto de ayuda/placeholder               |

## Outputs

| Output       | Tipo                         | Descripción                 |
|--------------|-----------------------------|-----------------------------|
| valueChange  | EventEmitter\<string\>      | Se dispara al cambiar valor |

---

## Ejemplo real

**Componente padre:**

export class AdminCountriesComponent {
searchTerm = '';

onValueChange(term: string) {
this.searchTerm = term;
this.filterCountries();
}

filterCountries() {
// Filtra tu array de países, llama a la API, etc.
}
}

text

**HTML:**

<app-search-box
[value]="searchTerm"
(valueChange)="onValueChange($event)"
placeholder="Filtra países...">
</app-search-box>

text

---

## Accesibilidad

- Input con roles y aria-label.
- Icono y botón limpiar accesibles por teclado y screenreader.
- Diseño responsive y adaptable.

---

## Estilos

Personaliza en `search-box.component.scss`:
:host {
display: flex;
}
input {
border-radius: 6px;
padding: 0.4em 2em 0.4em 2.2em;
font-size: 1rem;
// ...
}
.icon-search {
position: absolute;
left: 0.7em;
top: 50%;
transform: translateY(-50%);
// ...
}
.btn-clear {
position: absolute;
right: 0.7em;
// ...
}

text

---

## Ejemplo de test unitario (spec)

it('debe emitir valueChange al escribir', () => {
const input = fixture.nativeElement.querySelector('input');
input.value = 'hola';
input.dispatchEvent(new Event('input'));
fixture.detectChanges();
expect(component.valueChange.emit).toHaveBeenCalledWith('hola');
});

text

---

## Mejoras y recomendaciones

- Usar debounceTime si el input se conecta con llamadas a API.
- Puedes integrar iconografía SVG propia según tu diseño.
- Adapta estilos a dark mode si tu app lo requiere.

---

### Contacto y dudas

Modificado: **10/10/2025 17:58 CEST**  
Autor: Alejandro Abadía Fandos

---
