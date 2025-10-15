import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Componentes
import { UiIconComponent } from '../ui-icon/ui-icon.component';

export interface AdminMenuItem {
  label: string;
  route?: string | any[];
  icon?: string;
  external?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, UiIconComponent],
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMenuComponent {
  @Input() items: AdminMenuItem[] = [];
  @Input() footer?: string;

  constructor(private router: Router) {}

  /**
   * Determina si un elemento del menú está activo.
   * @param item El elemento del menú a comprobar.
   * @returns {boolean}
   */
  isActive(item: AdminMenuItem): boolean {
    if (!item.route || item.disabled) {
      return false;
    }
    return this.router.isActive(this.router.createUrlTree(Array.isArray(item.route) ? item.route : [item.route]), { paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' });
  }
}