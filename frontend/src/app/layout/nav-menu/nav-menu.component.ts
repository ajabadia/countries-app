// src/app/layout/nav-menu/nav-menu.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';

export interface NavMenuItem {
  label: string;
  name: string; // Usado para el icono
  route: string | any[]; // Used for the routerLink
}

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, UiButtonComponent],
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMenuComponent {
  @Input() items: NavMenuItem[] = [];
  @Input() basePath = '';
}