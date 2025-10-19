// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-hamburger-menu\ui-hamburger-menu.component.ts | Last Modified: 2025-10-19

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ActionService } from '@core/services/action.service';
import { UiAccordionComponent } from '@shared/components/ui-accordion/ui-accordion.component';
import { AccordionItem } from '@shared/components/ui-accordion/ui-accordion.types';
import { UiIconComponent } from '@shared/components/ui-icon/ui-icon.component';

@Component({
  selector: 'app-ui-hamburger-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, UiAccordionComponent, UiIconComponent],
  templateUrl: './ui-hamburger-menu.component.html',
  styleUrls: ['./ui-hamburger-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiHamburgerMenuComponent {
  private actionService = inject(ActionService);

  isMenuOpen = signal(false);
  menuLinkTemplate = viewChild.required<TemplateRef<any>>('menuLinkTemplate');

  accordionItems = computed<AccordionItem[]>(() => {
    const groupedActions = this.actionService.getGroupedActions(['public', 'admin']);

    return groupedActions.map(group => ({
      id: group.category,
      title: group.title,
      isExpanded: group.category === 'public', // Expand public by default
      // ✅ CORRECCIÓN: Se añade la propiedad 'content' requerida por la interfaz AccordionItem.
      // Se obtiene la referencia a la ng-template del componente.
      content: this.menuLinkTemplate(),
      data: group.actions,
    }));
  });

  /**
   * Cambia el estado de visibilidad del menú lateral.
   */
  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }
}