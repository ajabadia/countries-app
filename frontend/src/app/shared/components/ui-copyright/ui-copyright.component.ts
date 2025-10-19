// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-copyright\ui-copyright.component.ts | Last Modified: 2025-10-19

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-copyright',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-copyright.component.html',
  styleUrls: ['./ui-copyright.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCopyrightComponent {
  @Input({ alias: 'ui-copyright-company-name' }) companyName = 'CountriesApp';
  @Input({ alias: 'ui-copyright-start-year' }) startYear?: number;

  private readonly currentYear = new Date().getFullYear();

  get copyrightText(): string {
    const yearText = this.getYearText();
    return `© ${yearText} ${this.companyName}. Todos los derechos reservados.`;
  }

  private getYearText(): string {
    if (this.startYear && this.startYear < this.currentYear) {
      return `${this.startYear} - ${this.currentYear}`;
    }
    return this.currentYear.toString();
  }
}
