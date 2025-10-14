// src/app/modules/shared/components/toggle-checkbox/toggle-checkbox.component.ts

import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas como [class]

// Tipo para el estado visual del toggle-checkbox
export type ToggleState = 'checked' | 'unchecked' | 'indeterminate';

@Component({
  selector: 'app-toggle-checkbox',
  // --- REFACTORIZACIÓN A STANDALONE ---
  standalone: true,
  imports: [
    CommonModule // Importamos CommonModule para poder usar [class.xxx] en la plantilla.
  ],
  changeDetection: ChangeDetectionStrategy.OnPush, // MEJORA: Optimización de rendimiento.
  // ------------------------------------
  templateUrl: './toggle-checkbox.component.html',
  styleUrls: ['./toggle-checkbox.component.scss'],
})
export class ToggleCheckboxComponent implements AfterViewInit, OnChanges {
  // Estado externo ("checked", "unchecked", "indeterminate")
  @Input() state: ToggleState = 'unchecked';

  // Emite el estado tras el cambio de toggle
  @Output() stateChange = new EventEmitter<ToggleState>();

  // Controla acceso al checkbox real para manejar indeterminate correctamente
  @ViewChild('checkbox') checkbox!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.updateIndeterminateState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si el estado cambia desde fuera, actualizamos la propiedad 'indeterminate' del input real.
    if (changes['state']) {
      this.updateIndeterminateState();
    }
  }

  /**
   * Sincroniza el estado visual del componente con la propiedad 'indeterminate'
   * del elemento input nativo del navegador.
   */
  updateIndeterminateState(): void {
    if (this.checkbox?.nativeElement) {
      this.checkbox.nativeElement.indeterminate = this.state === 'indeterminate';
    }
  }

  /**
   * Gestiona el clic del usuario. El comportamiento es:
   * - Si está 'unchecked' o 'indeterminate', pasa a 'checked'.
   * - Si está 'checked', pasa a 'unchecked'.
   */
  toggle(): void {
    this.state = (this.state === 'checked') ? 'unchecked' : 'checked';
    this.updateIndeterminateState();
    this.stateChange.emit(this.state);
  }
}