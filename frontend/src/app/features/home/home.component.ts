// File: /frontend/src/app/features/home/home.component.ts

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { UiLogoComponent } from '@shared/components/ui-logo/ui-logo.component';
import { UiStatCardComponent } from '@shared/components/ui-stat-card/ui-stat-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    UiHeadingComponent,
    UiLogoComponent,
    UiStatCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  // Por ahora, no se necesita lógica aquí.
}
