// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-accordion\ui-accordion.component.ts | Last Modified: 2025-10-19

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItem } from './ui-accordion.types';
import { UiIconComponent } from '@shared/components/ui-icon/ui-icon.component';

@Component({
  selector: 'app-ui-accordion',
  standalone: true,
  imports: [CommonModule, UiIconComponent],
  templateUrl: './ui-accordion.component.html',
  styleUrls: ['./ui-accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAccordionComponent {
  @Input({ alias: 'ui-accordion-items' }) items: AccordionItem[] = [];
  @Input({ alias: 'ui-accordion-multi-expandable' }) multiExpandable = false;

  toggleItem(clickedItem: AccordionItem): void {
    if (clickedItem.disabled) {
      return;
    }

    const currentState = clickedItem.expanded;

    // Si no se permite la expansión múltiple, cerrar todos los demás items
    if (!this.multiExpandable) {
      this.items.forEach(item => {
        if (item.id !== clickedItem.id) {
          item.expanded = false;
        }
      });
    }

    // Abrir/cerrar el item clickeado
    clickedItem.expanded = !currentState;
  }
}