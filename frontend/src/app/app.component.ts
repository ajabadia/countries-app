// File: d:\desarrollos\countries2\frontend\src\app\app.component.ts | Last Modified: 2025-10-19

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UiHamburgerMenuComponent } from '@shared/components/ui-hamburger-menu/ui-hamburger-menu.component';
import { UiLogoComponent } from '@shared/components/ui-logo/ui-logo.component';
import { UiToastContainerComponent } from '@shared/components/ui-toast-container/ui-toast-container.component';
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';
import { LayoutService } from '@core/services/layout.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    UiHamburgerMenuComponent,
    UiLogoComponent,
    UiToastContainerComponent,
    UiButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // ✅ Hacemos público el servicio para poder usarlo en la plantilla.
  public authService = inject(AuthService);
  public layoutService = inject(LayoutService);

  pageTitle = this.layoutService.pageTitle;
}
