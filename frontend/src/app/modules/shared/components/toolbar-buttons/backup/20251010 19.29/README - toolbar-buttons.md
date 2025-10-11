# ToolbarButtonsComponent

Componente Angular para mostrar una barra de herramientas con botones "Nuevo", "Editar" y "Eliminar", adaptado a entidades seleccionadas mediante Input/Output. Permite su uso genérico en módulos CRUD y gestión de tablas.

## API del componente

@Component({
selector: 'app-toolbar-buttons',
templateUrl: './toolbar-buttons.component.html',
styleUrls: ['./toolbar-buttons.component.scss']
})
export class ToolbarButtonsComponent {
@Input() selected: any[] = [];
@Input() entity: string = 'elemento';

@Output() new = new EventEmitter<void>();
@Output() edit = new EventEmitter<void>();
@Output() delete = new EventEmitter<void>();
}

text

## Inputs

- `selected`: array de elementos seleccionados, normalmente filas de una tabla (`any[]`). Usado para habilitar/deshabilitar botones según la selección actual.
- `entity`: nombre de la entidad gestionada, usado para etiquetar tooltips y mensajes. Ej: 'country', 'usuario'.

## Outputs

- `new`: evento emitido al pulsar el botón "Nuevo".
- `edit`: evento emitido al pulsar el botón "Editar".
- `delete`: evento emitido al pulsar el botón "Eliminar".

## Ejemplo de uso

<app-toolbar-buttons
[selected]="selectedItems"
entity="country"
(new)="onNew()"
(edit)="onEdit()"
(delete)="onDeleteSelected()">
</app-toolbar-buttons>

text

## Ejemplo de código del padre (TypeScript)

selectedItems: Country[] = [];

onNew() {
// Lógica para crear país
}
onEdit() {
// Lógica para editar país seleccionado
}
onDeleteSelected() {
// Lógica para eliminar países seleccionados
}

text

## Estilos y UX

- Botones utilizan estilos flexibles (`.toolbar-buttons`) y colores adaptativos para cada acción.
- Soporte responsive (barras horizontales en móvil, iconos escalados).
- El botón de "Eliminar" usa colores de alerta.

### Fragmento de SCSS relevante

.toolbar-buttons {
display: flex;
gap: 1rem;
// ...otros estilos (ver archivo toolbar-buttons.component.scss)

app-ui-button.toolbar-btn.danger {
background: var(--color-danger-h8, #fff2f1);
color: var(--color-danger, #e84c3d);
&:hover:not(:disabled),
&:focus-visible:not(:disabled) {
background: var(--color-danger-h6, #ffe5e3);
color: var(--color-danger-dark, #b22c24);
}
// ...
}
}
@media (max-width: 600px) {
.toolbar-buttons {
gap: 0.6em;
// ...
}
}

text

## Ejemplo avanzado

Obligar selección para "Editar" o "Eliminar":
<app-toolbar-buttons
[selected]="selectedItems"
entity="usuario"
(new)="onNewUsuario()"
(edit)="onEditUsuario()"
(delete)="onDeleteUsuario()">
</app-toolbar-buttons>

text
undefined
get canEditUsuario() {
return this.selectedItems.length === 1;
}
get canDeleteUsuario() {
return this.selectedItems.length >= 1;
}

text

## Test básico

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarButtonsComponent } from './toolbar-buttons.component';

describe('ToolbarButtonsComponent', () => {
let component: ToolbarButtonsComponent;
let fixture: ComponentFixture<ToolbarButtonsComponent>;

beforeEach(async () => {
await TestBed.configureTestingModule({
declarations: [ToolbarButtonsComponent]
}).compileComponents();
fixture = TestBed.createComponent(ToolbarButtonsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});

it('should create', () => {
expect(component).toBeTruthy();
});
});