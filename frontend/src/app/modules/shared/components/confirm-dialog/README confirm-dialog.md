# confirm-dialog

*Fecha: 2025-10-10*

Componente Angular reutilizable para mostrar un modal de confirmación con variantes visuales, integración fácil en cualquier flujo de acción, y soporte accesible por teclado.

---

## API del componente

@Component({
selector: 'app-confirm-dialog',
templateUrl: './confirm-dialog.component.html',
styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
/** Título del modal /
@Input() title: string = '';
/* Mensaje a mostrar /
@Input() message: string = '';
/* ¿Está visible el diálogo? /
@Input() visible: boolean = false;
/* Variante visual: 'info' | 'success' | 'error' | 'warning' */
@Input() variant: 'info' | 'success' | 'error' | 'warning' = 'info';

/** Evento de confirmación /
@Output() confirm = new EventEmitter<void>();
/* Evento de cancelación */
@Output() cancel = new EventEmitter<void>();
}

text

---

## Ejemplo de uso básico

<app-confirm-dialog
[title]="'¿Eliminar país?'"
[message]="'Esta acción eliminará el país seleccionado.'"
[variant]="'error'"
[visible]="showConfirmDelete"
(confirm)="eliminarPais()"
(cancel)="cancelarEliminar()">
</app-confirm-dialog>

text
undefined
showConfirmDelete = false;

abrirConfirmEliminar() { this.showConfirmDelete = true; }

eliminarPais() {
// Eliminar y cerrar modal
this.showConfirmDelete = false;
}
cancelarEliminar() {
this.showConfirmDelete = false;
}

text

---

## Props detalladas

| Propiedad  | Tipo   | Descripción                                               |
|------------|--------|-----------------------------------------------------------|
| title      | string | Texto para el encabezado del modal                        |
| message    | string | Mensaje principal del modal                               |
| visible    | bool   | Controla visibilidad del modal                            |
| variant    | string | Variante visual: info, error, success, warning            |

| Evento     | Tipo               | Descripción                           |
|------------|--------------------|---------------------------------------|
| confirm    | EventEmitter<void> | Emitido al confirmar (botón/Enter)    |
| cancel     | EventEmitter<void> | Emitido al cancelar (botón/Escape)    |

---

## Ejemplo con lógica condicional

<app-confirm-dialog
[title]="dialogTitle"
[message]="dialogMsg"
[variant]="dialogType"
[visible]="dialogOpen"
(confirm)="onConfirmAction()"
(cancel)="onCancelAction()">
</app-confirm-dialog>

text
undefined
dialogTitle = '¿Borrar usuario?';
dialogMsg = 'No podrás revertir esta acción.';
dialogType: 'warning' = 'warning';
dialogOpen = false;

onConfirmAction() { /* lógica de borrado */ dialogOpen = false; }
onCancelAction() { dialogOpen = false; }

text

---

## Accesibilidad

- Se puede cerrar con `Escape`, confirmar con `Enter`.
- Centrado, bloqueo de fondo y animación fade.
- Iconos y colores cambian según `variant` (`info`, `error`, `success`, `warning`).

---

## Personalización visual SCSS (extracto)

.confirm-dialog {
position: fixed; // Cubre toda la pantalla
background: var(--modal-overlay-bg, rgba(35,48,137,0.25));
// Modal principal
&__modal {
border-left: 4px solid; // Color dinámico por variante
max-width: 370px;
padding: 1.7em 1em;
// variantes
&--info { border-color: #0b7ad0; }
&--error { border-color: #dd4c40; }
&--success { border-color: #4ab83e; }
&--warning { border-color: #fdaf3c; }
}
// Botones y acciones
&__btn--confirm { /* Estilo primario / }
&__btn--cancel { / Estilo secundario */ }
}

text

---

## Test básico de integración

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
let component: ConfirmDialogComponent;
let fixture: ComponentFixture<ConfirmDialogComponent>;

beforeEach(async () => {
await TestBed.configureTestingModule({
declarations: [ConfirmDialogComponent]
}).compileComponents();
fixture = TestBed.createComponent(ConfirmDialogComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});

it('should create', () => {
expect(component).toBeTruthy();
});
});