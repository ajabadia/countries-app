// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-hamburger-menu\ui-hamburger-menu.component.ts | Last Modified: 2025-10-19

import { Component, OnInit, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UiAccordionComponent } from '@shared/components/ui-accordion/ui-accordion.component';
import { AccordionItem } from '@shared/components/ui-accordion/ui-accordion.types';
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';
import { ActionService, AppAction, ActionCategory } from '@core/services/action.service';
import { UiIconComponent } from '@shared/components/ui-icon/ui-icon.component';

interface MenuGroup {
  id: string;
  title: string;
  actions: AppAction[];
}

@Component({
  selector: 'app-ui-hamburger-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, UiButtonComponent, UiAccordionComponent, UiIconComponent],
  templateUrl: './ui-hamburger-menu.component.html',
  styleUrls: ['./ui-hamburger-menu.component.scss'],
})
export class UiHamburgerMenuComponent implements OnInit {
  private actionService = inject(ActionService);

  public isMenuOpen = signal(false);
  public menuGroups: MenuGroup[] = [];
  public accordionItems: AccordionItem[] = [];

  // Obtenemos las plantillas para el contenido del acordeón
  @ViewChild('publicTemplate', { static: true }) publicTemplate!: TemplateRef<any>;
  @ViewChild('adminTemplate', { static: true }) adminTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    // 1. Obtener todas las acciones de navegación
    const navActions = this.actionService.getActionsForCategories(['public', 'admin']);

    // 2. Agrupar acciones por categoría
    const grouped = navActions.reduce((acc, action) => {
      (acc[action.category] = acc[action.category] || []).push(action);
      return acc;
    }, {} as Record<ActionCategory, AppAction[]>);

    // 3. Crear los grupos para la plantilla
    this.menuGroups = Object.entries(grouped).map(([category, actions]) => ({
      id: category,
      title: this.getCategoryTitle(category as ActionCategory),
      actions: actions,
    }));

    // 4. Crear los items para el componente de acordeón
    this.accordionItems = this.menuGroups.map(group => ({
      id: group.id,
      title: group.title,
      content: this.getTemplateForCategory(group.id as ActionCategory),
      expanded: group.id === 'public', // Expandir la sección pública por defecto
    }));
  }

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

  private getTemplateForCategory(category: ActionCategory): TemplateRef<any> {
    if (category === 'admin') {
      return this.adminTemplate;
    }
    return this.publicTemplate; // Fallback a la plantilla pública
  }
}
