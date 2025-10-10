import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {
  @Input() items: AdminMenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/pages/dashboard' },
    { label: 'Países', icon: 'flag', route: '/admin/countries' },
    { label: 'Áreas', icon: 'map', route: '/admin/areas' },
    { label: 'Idiomas', icon: 'language', route: '/admin/languages' },
    { label: 'Usuarios', icon: 'user', route: '/admin/users' }
  ];

  @Input() footer?: string;

  constructor(public router: Router) {}

  isActive(item: AdminMenuItem): boolean {
  return !!(item.active ?? (item.route && this.router.url.startsWith(typeof item.route === 'string' ? item.route : item.route[0])));
}

}
