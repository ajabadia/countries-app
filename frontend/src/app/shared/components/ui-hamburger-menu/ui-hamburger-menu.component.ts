// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-hamburger-menu\ui-hamburger-menu.component.ts | Last Modified: 2025-10-19

import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ActionService } from '@core/services/action.service';
import { AppAction, GroupedAppAction } from '@core/types/action.types';
import { UiAccordionComponent } from '@shared/components/ui-accordion/ui-accordion.component';
import { AccordionItem } from '@shared/components/ui-accordion/ui-accordion.types';
import { UiIconComponent } from '@shared/components/ui-icon/ui-icon.component';
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';

@Component({
  selector: 'app-ui-hamburger-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UiAccordionComponent,
    UiIconComponent, // ✅ CORRECCIÓN: Se añade UiIconComponent a los imports del componente.
    UiButtonComponent,
  ],
  templateUrl: './ui-hamburger-menu.component.html',
  styleUrls: ['./ui-hamburger-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiHamburgerMenuComponent {
  private actionService = inject(ActionService);

  isMenuOpen = signal(false);

  menuLinkTemplate = viewChild.required<TemplateRef<{ $implicit: AppAction[] }>>('menuLinkTemplate');

  // 1. Los items del acordeón ahora son un signal escribible, inicializado como vacío.
  accordionItems = signal<AccordionItem[]>([]);

  constructor() {
    // 2. Se usa un 'effect' para reaccionar al cambio de la plantilla.
    // Este código se ejecutará automáticamente cuando 'menuLinkTemplate' se resuelva.
    effect(() => {
      const template = this.menuLinkTemplate();
      if (template) {
        const categories = this.actionService.getAllCategories();
        const groupedActions = this.actionService.getGroupedNavActions(categories);

        const items = groupedActions.map((group: GroupedAppAction) => ({
          id: group.category,
          title: group.title,
          isExpanded: group.category === 'public',
          content: template,
          data: group.actions,
        }));
        // 3. Se actualiza el signal con los items calculados.
        this.accordionItems.set(items);
      }
    });
  }

  /**
   * Cambia el estado de visibilidad del menú lateral.
   */
  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }
}