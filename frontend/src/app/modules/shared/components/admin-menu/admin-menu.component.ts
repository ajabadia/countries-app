// src/app/modules/shared/components/admin-menu/admin-menu.component.ts

import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule
import { CommonModule } from '@angular/common'; // Importa CommonModule para directivas como @for, @if
import { UiButtonComponent } from '../ui-button/ui-button.component'; // Importa el componente hijo que usa la plantilla

// La interfaz no necesita cambios
export interface AdminMenuItem {
  label: string;
  icon?: string;
  route?: any[] | string;
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
  submenu?: AdminMenuItem[];
}

@Component({
    selector: 'app-admin-menu',
    // ¡CLAVE! Se convierte a standalone
    standalone: true,
    // ¡CLAVE! Los componentes standalone declaran sus propias dependencias aquí
    imports: [
      CommonModule,
      RouterModule,
      UiButtonComponent // Añadimos el componente que se usa en el HTML
    ],
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.scss'],
})
export class AdminMenuComponent {
  @Input() items: AdminMenuItem[] = []; // El valor por defecto se elimina para que siempre se pase desde fuera
  @Input() footer?: string;

  constructor(public router: Router) {}

  isActive(item: AdminMenuItem): boolean {
    if (!item.route || item.external) {
      return false;
    }
    // Lógica mejorada para comprobar la ruta activa
    const routeString = Array.isArray(item.route) ? item.route[0] : item.route;
    return this.router.isActive(routeString, { paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' });
  }
}