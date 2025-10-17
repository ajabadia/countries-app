// src/app/layout/header/header.component.ts
import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../../modules/shared/components/logo/logo.component';
import { NavMenuComponent, NavMenuItem } from '../nav-menu/nav-menu.component';
import { TitleService } from '../../services/title.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, AsyncPipe, LogoComponent, NavMenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // ✅ REFACTOR: Inyectamos el servicio de título y exponemos su observable a la plantilla.
  private titleService = inject(TitleService);
  public pageTitle$ = this.titleService.title$;

  // ✅ REFACTOR: Definimos los items para el nuevo menú de navegación principal.
  // ✅ CORRECTION: The `NavMenuItem` interface expects a `route` property for the routerLink.
  // The `path` property is not used by the nav-menu component in this context.
  public readonly mainMenuItems: NavMenuItem[] = [
    { name: 'icon-country', label: 'Public', route: '/' },
    { name: 'icon-admin', label: 'Admin', route: '/admin' },
    { name: 'icon-flask', label: 'Test', route: '/test' },
  ];
}