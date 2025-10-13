import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

export interface MenuBarItem {
  label: string;
  icon?: string; // svg nombre, sin assets/icons
  route?: string;
  external?: boolean;
  active?: boolean;
  disabled?: boolean;
  badge?: string | number;
}

@Component({
    selector: 'app-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss'],
    standalone: false
})
export class MenuBarComponent {
  @Input() items: MenuBarItem[] = [];
  @Input() ariaLabel: string = 'Menú principal';

  constructor(public router: Router) {}

  isActive(item: MenuBarItem) {
    if (!item.route || item.external) return false;
    return this.router.url === item.route || this.router.url.startsWith(item.route);
  }
}
