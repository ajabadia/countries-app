// ui-stat-card.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiIconComponent } from '../ui-icon/ui-icon.component';
import { UiIconType } from 'src/app/services/icon.service';

@Component({
  selector: 'app-ui-stat-card',
  standalone: true,
  imports: [CommonModule, RouterModule, UiIconComponent],
  templateUrl: './ui-stat-card.component.html',
  styleUrls: ['./ui-stat-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiStatCardComponent {
  @Input() label!: string;
  @Input() value!: string | number;
  @Input() icon?: string;
  @Input() iconType: UiIconType = 'system';
  @Input() detailRoute?: string | any[];
  @Input.transform(Number)
  @Input() valueFontSize: number = 2.2; // en 'rem'

  /**
   * Determina si el componente debe actuar como un enlace.
   * @returns {boolean}
   */
  get isLink(): boolean {
    return !!this.detailRoute;
  }
}
