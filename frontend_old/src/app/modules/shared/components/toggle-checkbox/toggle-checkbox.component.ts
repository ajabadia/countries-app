// src/app/modules/shared/components/toggle-checkbox/toggle-checkbox.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostBinding, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

// Tipo para el estado visual del toggle-checkbox
export type ToggleState = 'on' | 'off' | 'intermediate';

@Component({
  selector: 'app-toggle-checkbox',
  standalone: true,
  imports: [CommonModule, UiIconComponent],
  templateUrl: './toggle-checkbox.component.html',
  styleUrls: ['./toggle-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleCheckboxComponent {
  @Input() state: ToggleState = 'off';
  @Output() stateChange = new EventEmitter<ToggleState>();

  // Vinculamos el estado a una clase en el host para estilado fácil y coherente
  @HostBinding('class') get hostClass() {
    return `toggle-checkbox--${this.state}`;
  }

  // Hacemos el componente clicable
  @HostBinding('attr.role') role = 'checkbox';
  @HostBinding('attr.tabindex') tabindex = 0;
  @HostListener('click')
  @HostListener('keydown.enter')
  @HostListener('keydown.space')
  onClick(event?: Event) {
    event?.preventDefault();
    this.toggle();
  }

  /**
   * Gestiona el clic del usuario. El comportamiento es:
   * - Si está 'off' o 'intermediate', pasa a 'on'.
   * - Si está 'on', pasa a 'off'.
   */
  toggle(): void {
    this.state = (this.state === 'on') ? 'off' : 'on';
    this.stateChange.emit(this.state);
  }
}