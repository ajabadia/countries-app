// File: d:\desarrollos\countries2\frontend\src\app\app.component.ts | Last Modified: 2025-10-19

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UiHamburgerMenuComponent } from '@shared/components/ui-hamburger-menu/ui-hamburger-menu.component';
import { UiLogoComponent } from '@shared/components/ui-logo/ui-logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    UiHamburgerMenuComponent,
    UiLogoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'frontend';
}
