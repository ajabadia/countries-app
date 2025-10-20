// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-toggle-checkbox\ui-toggle-checkbox.component.ts | Last Modified: 2025-10-19

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostBinding, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent } from '@shared/components/ui-icon/ui-icon.component';

// Tipo para el estado visual del toggle-checkbox
export type UiToggleState = 'ui-toggle-checked' | 'ui-toggle-unchecked' | 'ui-toggle-indeterminate';

@Component({
  selector: 'app-ui-toggle-checkbox',
  standalone: true,
  imports: [CommonModule, UiIconComponent],
  templateUrl: './ui-toggle-checkbox.component.html',
  styleUrls: ['./ui-toggle-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiToggleCheckboxComponent {
  @Input({ alias: 'ui-toggle-checkbox-state' }) state: UiToggleState = 'ui-toggle-unchecked';
  @Output('ui-toggle-checkbox-state-change') stateChange = new EventEmitter<UiToggleState>();

  // Vinculamos el estado a una clase en el host para estilado fácil y coherente
  @HostBinding('class') get hostClass() {
    return `toggle-checkbox--${this.state}`;
  }

  // Hacemos el componente accesible e interactivo
  @HostBinding('attr.role') role = 'checkbox';
  @HostBinding('attr.tabindex') tabindex = 0;
  @HostBinding('attr.aria-checked') get ariaChecked() {
    if (this.state === 'ui-toggle-checked') return 'true';
    if (this.state === 'ui-toggle-indeterminate') return 'mixed';
    return 'false';
  }

  @HostListener('click', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  _onClick(event?: Event): void {
    event?.preventDefault();
    this.toggle();
  }

  /**
   * Cambia el estado del checkbox por acción del usuario.
   * El estado 'indeterminate' solo puede ser establecido por Input, un clic
   * siempre resolverá a 'checked' o 'unchecked'.
   */
  private toggle(): void {
    // Si está 'checked', pasa a 'unchecked'.
    // Si está 'unchecked' o 'indeterminate', pasa a 'checked'.
    this.state = this.state === 'ui-toggle-checked' ? 'ui-toggle-unchecked' : 'ui-toggle-checked';
    this.stateChange.emit(this.state);
  }
}
