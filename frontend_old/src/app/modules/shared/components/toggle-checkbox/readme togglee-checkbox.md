# ToggleCheckboxComponent

Componente Angular para crear un *checkbox* avanzado con tres estados: `checked`, `unchecked`, `indeterminate`. Ideal para selección múltiple en listas y tablas.

## API del componente

@Component({
selector: 'app-toggle-checkbox',
templateUrl: './toggle-checkbox.component.html',
styleUrls: ['./toggle-checkbox.component.scss']
})
export class ToggleCheckboxComponent implements AfterViewInit, OnChanges {
/** Estado visual del checkbox: "checked" | "unchecked" | "indeterminate" */
@Input() state: 'checked' | 'unchecked' | 'indeterminate' = 'unchecked';

/** Evento emitido cuando el estado cambia por acción del usuario */
@Output() stateChange = new EventEmitter<'checked' | 'unchecked' | 'indeterminate'>();
}

text

## Ejemplo básico de uso

<app-toggle-checkbox
[state]="generalToggleState"
(stateChange)="onGeneralToggle($event)">
</app-toggle-checkbox>

text
undefined
generalToggleState: 'checked' | 'unchecked' | 'indeterminate' = 'unchecked';

onGeneralToggle(newState: 'checked' | 'unchecked' | 'indeterminate') {
// Actualiza la selección global
}

text

## Ejemplo integrado en celda de tabla

<tr *ngFor="let item of items"> <td> <app-toggle-checkbox [state]="isSelected(item) ? 'checked' : 'unchecked'" (stateChange)="onRowToggle(item, $event)"> </app-toggle-checkbox> </td> <td>{{ item.nombre }}</td> </tr> ```
Propiedades y eventos
Propiedad	Tipo	Descripción
state	string	Estado actual: checked, unchecked, indeterminate
stateChange	EventEmitter	Emite el nuevo estado tras click/toggle
Comportamiento y estilos
Cambios de estado por click/touch: alterna entre checked y unchecked; permite pasar a indeterminate si lo recibe por Input.

Estilos personalizados y responsivos en toggle-checkbox.component.scss:

Colores distintos y animaciones según estado

Accesible y minimalista

Tamaño adaptable: 38x22 px

Fragmento de SCSS relevante:

text
.toggle {
  position: relative;
  display: inline-block;
  width: 38px;
  height: 22px;
  // ...
  &.toggle--checked .slider {
    background: #aeeaff;
    &::before { left: 18px; background: #03a9f4; }
  }
  &.toggle--indeterminate .slider {
    background: #ffe584;
    &::before { left: 10px; background: #b4b4b4; }
  }
}
Test básico
text
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleCheckboxComponent } from './toggle-checkbox.component';

describe('ToggleCheckboxComponent', () => {
  let component: ToggleCheckboxComponent;
  let fixture: ComponentFixture<ToggleCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleCheckboxComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(ToggleCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
Notas
El estado indeterminate solo se visualiza, no puede activarse manualmente por el usuario (por convención UX).

Los eventos permiten integración fácil con servicios de selección y tablas.