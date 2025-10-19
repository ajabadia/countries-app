// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-hamburger-menu\ui-hamburger-menu.component.ts | Last Modified: 2025-10-19

import { Component, inject, signal, ChangeDetectionStrategy, computed, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UiAccordionComponent } from '@shared/components/ui-accordion/ui-accordion.component';
import { AccordionItem } from '@shared/components/ui-accordion/ui-accordion.types';
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';
import { ActionService, AppAction, ActionCategory } from '@core/services/action.service';
import { UiIconComponent } from '@shared/components/ui-icon/ui-icon.component';

// Interface para el contexto de la plantilla de cada grupo de menú
export interface MenuGroupTemplateContext {
  $implicit: AppAction[];
}

@Component({
  selector: 'app-ui-hamburger-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, UiButtonComponent, UiAccordionComponent, UiIconComponent],
  templateUrl: './ui-hamburger-menu.component.html',
  styleUrls: ['./ui-hamburger-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiHamburgerMenuComponent {
  private actionService = inject(ActionService);

  // Obtenemos una referencia a la plantilla para poder asignarla dinámicamente
  @ViewChild('menuLinkTemplate', { static: true }) menuLinkTemplate!: TemplateRef<any>;

  public isMenuOpen = signal(false);

  // TODO: Filtrar acciones según los permisos del usuario actual.
  public accordionItems = computed(() => {
    // 1. Obtener todas las acciones de navegación relevantes
    const navActions = this.actionService.getActionsForCategories(['public', 'admin']);

    // 2. Agrupar acciones por categoría
    const groupedActions = navActions.reduce(
      (acc, action) => {
        const group = acc.get(action.category) || [];
        group.push(action);
        acc.set(action.category, group);
        return acc;
      },
      new Map<ActionCategory, AppAction[]>()
    );

    // 3. Convertir los grupos en items para el componente de acordeón
    return Array.from(groupedActions.entries()).map(([category, actions]) => ({
      id: category,
      title: this.getCategoryTitle(category),
      // Pasamos las acciones directamente en el contexto para que la plantilla las reciba
      content: this.menuLinkTemplate, // Asignamos la plantilla al contenido del acordeón
      context: { $implicit: actions }, // El contexto se usará al renderizar la plantilla
      expanded: category === 'public', // Expandir la sección pública por defecto
    }));
  });

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  private getCategoryTitle(category: ActionCategory): string {
    const titles: Record<ActionCategory, string> = {
      public: 'Navegación Principal',
      admin: 'Administración',
      user: 'Mi Cuenta',
      dev: 'Desarrollo',
      test: 'Pruebas',
    };
    return titles[category] || 'General';
  }
}
